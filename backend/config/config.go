package config

import (
	"onboardingportal/utils"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	SQLiteHost              string
	SQLitePort              string
	SQLiteUser              string
	SQLitePassword          string
	SQLiteDBName            string
	ServerPort              string
	SatelliteBaseUrl        string
	SatelliteIss            string
	SatelliteAud            string
	SatelliteX5c            string
	SatellitePrivateKeyPath string
	SatellitePrivateKey     string
}

func NewConfig() *Config {
	return &Config{}
}

func (config *Config) LoadEnvironment() error {
	err := godotenv.Load(".env")
	if err != nil {
		return err
	}

	// SQLite Configuration
	config.SQLiteHost = os.Getenv("SQLITE_HOST")
	config.SQLitePort = os.Getenv("SQLITE_PORT")
	config.SQLiteUser = os.Getenv("SQLITE_USER")
	config.SQLitePassword = os.Getenv("SQLITE_PASSWORD")
	config.SQLiteDBName = os.Getenv("SQLITE_DB_NAME")

	// Server Configuration
	config.ServerPort = os.Getenv("SERVER_PORT")

	// Satellite Configuration
	config.SatelliteBaseUrl = os.Getenv("SATELLITE_BASE_URL")
	config.SatelliteIss = os.Getenv("SATELLITE_ISS")
	config.SatelliteAud = os.Getenv("SATELLITE_AUD")
	config.SatelliteX5c = os.Getenv("SATELLITE_X5C")
	config.SatellitePrivateKeyPath = os.Getenv("SATELLITE_PRIVATE_KEY_PATH")

	privateKey, err := utils.LoadPrivateKey(config.SatellitePrivateKeyPath)
	if err != nil {
		return err
	}
	config.SatellitePrivateKey = privateKey

	return nil
}
