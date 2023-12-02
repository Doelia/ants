#!/bin/bash

export DOCKER_DEFAULT_PLATFORM=linux/amd64

docker login
docker build . -f .cloud/Dockerfile -t doelia/ants:main
docker push doelia/ants:main
