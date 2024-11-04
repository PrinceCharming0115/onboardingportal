# syntac=docker/dockerfile:1
FROM golang:1.23 AS builder

# Set destination for COPY
WORKDIR /opt/app

COPY . .

# Download Go modules
RUN go mod download

# Build the Go application
RUN go build -o app ./cmd/...

ENTRYPOINT [ "/opt/app/app" ]
