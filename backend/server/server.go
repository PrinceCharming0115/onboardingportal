package server

import (
	"onboardingportal/config"
	"onboardingportal/db"
	"onboardingportal/server/middlewares"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

type Server struct {
	App    *fiber.App
	Config *config.Config
	DB     *gorm.DB
}

func NewServer(config *config.Config) (*Server, error) {
	app := fiber.New()

	// Enable CORS
	app.Use(cors.New())

	app.Use(middlewares.Logger())

	db, err := db.Init(config)
	if err != nil {
		return nil, err
	}

	return &Server{
		App:    app,
		Config: config,
		DB:     db,
	}, nil
}

func (server *Server) Listen() {
	server.App.Listen(":" + server.Config.ServerPort)
}
