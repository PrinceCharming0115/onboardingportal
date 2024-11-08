package responses

import (
	"github.com/gofiber/fiber/v2"
)

type Error struct {
	Code  int    `json:"code"`
	Error string `json:"error"`
}

type Data struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}

func Response(c *fiber.Ctx, statusCode int, data any) error {
	return c.Status(statusCode).JSON(data)
}

func MessageResponse(c *fiber.Ctx, statusCode int, message string) error {
	return c.Status(statusCode).JSON(Data{
		Code:    statusCode,
		Message: message,
	})
}

func ErrorResponse(c *fiber.Ctx, statusCode int, error string) error {
	return c.Status(statusCode).JSON(Error{
		Code:  statusCode,
		Error: error,
	})
}
