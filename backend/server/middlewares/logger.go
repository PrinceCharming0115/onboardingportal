package middlewares

import (
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Logger() fiber.Handler {
	return func(c *fiber.Ctx) error {
		start := time.Now()

		// Log before request is processed
		logMessage := fmt.Sprintf(
			"[%s] %s %s - %d - %v",
			time.Now().Format("2006-01-02 15:04:05"),
			c.Method(),
			c.Path(),
			c.Response().StatusCode(),
			time.Since(start),
		)

		fmt.Println(logMessage)

		err := c.Next()

		return err
	}
}
