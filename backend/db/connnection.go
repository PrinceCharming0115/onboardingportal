package db

import (
	"fmt"
	cfg "onboardingportal/config"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Init(config *cfg.Config) (*gorm.DB, error) {
	dataSourceName := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		config.SQLiteUser,
		config.SQLitePassword,
		config.SQLiteHost,
		config.SQLitePort,
		config.SQLiteDBName,
	)

	db, err := gorm.Open(sqlite.Open(dataSourceName), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		return nil, err
	}

	return db, nil
}
