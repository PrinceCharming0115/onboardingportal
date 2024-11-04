package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func CreateSatelliteOwnerAccessToken(iss string, aud string, x5c string, privateKey string) (string, error) {
	iat := time.Now().Unix()
	exp := iat + 3600

	// Parse the private key
	parsedKey, err := jwt.ParseRSAPrivateKeyFromPEM([]byte(privateKey))
	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{
		"iss": iss,
		"aud": aud,
		"x5c": x5c,
		"iat": iat,
		"exp": exp,
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	// Sign the token with the private key
	signedToken, err := token.SignedString(parsedKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
