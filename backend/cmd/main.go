package main

import (
	"log"
	"onboardingportal/config"
	"onboardingportal/server"
	"onboardingportal/server/routes"
)

func main() {
	config := config.NewConfig()
	err := config.LoadEnvironment()
	if err != nil {
		log.Fatalf("Error loading environment variables: %v", err)
	}

	server, err := server.NewServer(config)
	if err != nil {
		log.Fatalf("Error creating server: %v", err)
	}

	routes.ConfigureRoutes(server, config)

	server.Listen()
}
