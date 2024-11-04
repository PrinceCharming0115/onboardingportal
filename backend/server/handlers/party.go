package handlers

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"onboardingportal/config"
	"onboardingportal/requests"
	"onboardingportal/responses"
	s "onboardingportal/server"
	"onboardingportal/utils"

	"github.com/gofiber/fiber/v2"
)

type HandlerParty struct {
	Server *s.Server
	Config *config.Config
}

// CreateSatelliteOwnerAccessToken
func createSatelliteOwnerAccessToken(config *config.Config) (string, error) {
	iss := config.SatelliteIss
	aud := config.SatelliteAud
	x5c := config.SatelliteX5c
	privateKey := config.SatellitePrivateKey

	return utils.CreateSatelliteOwnerAccessToken(iss, aud, x5c, privateKey)
}

func NewHandlerParty(server *s.Server, config *config.Config) *HandlerParty {
	return &HandlerParty{
		Server: server,
		Config: config,
	}
}

// CreateParty
func (h *HandlerParty) CreateParty(c *fiber.Ctx) error {
	// Parse the request body
	request := requests.PartyCreateRequest{}

	// Detailed validation check for the request body
	decoder := json.NewDecoder(bytes.NewReader(c.Body()))
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&request)
	if err != nil {
		var unmarshalTypeError *json.UnmarshalTypeError

		switch {
		case errors.As(err, &unmarshalTypeError):
			errMsg := fmt.Sprintf("Invalid type for field '%s'. Expected %s, got %s",
				unmarshalTypeError.Field, unmarshalTypeError.Type, unmarshalTypeError.Value)
			return responses.ErrorResponse(c, fiber.StatusBadRequest, errMsg)
		default:
			return responses.ErrorResponse(c, fiber.StatusBadRequest, "Invalid create party request data: "+err.Error())
		}
	}

	accessToken, err := createSatelliteOwnerAccessToken(h.Server.Config)
	if err != nil {
		return responses.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to create satellite owner access token.")
	}

	// Create a new HTTP client
	client := &http.Client{}

	req, err := http.NewRequest("POST", h.Config.SatelliteBaseUrl+"/ep_creation", bytes.NewBuffer(c.Body()))
	if err != nil {
		return responses.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to create request to satellite.")
	}

	// Add the access token to the request headers
	req.Header.Add("Authorization", "Bearer "+accessToken)
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	res, err := client.Do(req)
	if err != nil {
		return responses.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to send request to satellite.")
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return responses.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to read response body.")
	}

	// Parse the JSON response
	var responseData map[string]interface{}
	err = json.Unmarshal(body, &responseData)
	if err != nil {
		return responses.ErrorResponse(c, fiber.StatusInternalServerError, "Failed to parse response body.")
	}
	fmt.Printf("Response: %v\n", responseData)
	// Check the response status
	if res.StatusCode != http.StatusOK {
		return responses.ErrorResponse(c, res.StatusCode, responseData["message"].(string))
	}

	return responses.MessageResponse(c, fiber.StatusOK, "Your request is successfully accepted. Verification process started.")
}
