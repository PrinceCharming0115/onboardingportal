package routes

import (
	"onboardingportal/config"
	"onboardingportal/responses"
	s "onboardingportal/server"
	"onboardingportal/server/handlers"

	"github.com/gofiber/fiber/v2"
)

func ConfigureRoutes(server *s.Server, config *config.Config) {
	server.App.Get("/healthcheck", func(c *fiber.Ctx) error {
		return responses.MessageResponse(c, fiber.StatusOK, "Server is running")
	})

	groupParty := server.App.Group("/party")
	GroupPartyRequests(server, groupParty, config)
}

func GroupPartyRequests(server *s.Server, group fiber.Router, config *config.Config) {
	handler := handlers.NewHandlerParty(server, config)

	group.Post("/", handler.CreateParty)
}
