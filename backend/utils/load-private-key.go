package utils

import (
	"fmt"
	"io/ioutil"
)

func LoadPrivateKey(path string) (string, error) {
	// Check if the path is empty
	if path == "" {
		fmt.Println("Private key path is empty")
		return "", nil
	}

	// Read the private key file
	privateKey, err := ioutil.ReadFile(path)
	if err != nil {
		fmt.Println("Error reading private key file:", err)
		return "", err
	}

	// Print the private key
	fmt.Println("Private key:", string(privateKey))

	return string(privateKey), nil
}
