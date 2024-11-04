package responses

import (
	"onboardingportal/models"

	"github.com/gofiber/fiber/v2"
)

type ResponseParty struct {
}

func NewResponseParty(c *fiber.Ctx, statusCode int, parties []models.Party) error {
	responses := []ResponseParty{}

	// for _, party := range parties {
	// 	responses = append(responses, ResponseParty{})
	// }

	return Response(c, statusCode, responses)
}
