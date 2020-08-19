# Event monitoring [![Build Status](https://github.com/peppersec/event-monitoring/workflows/build/badge.svg)](https://github.com/peppersec/event-monitoring/actions) [![Docker Image Version (latest semver)](https://img.shields.io/docker/v/peppersec/event-monitoring?logo=docker&logoColor=%23FFFFFF&sort=semver)](https://hub.docker.com/repository/docker/peppersec/event-monitoring)

Monitors regular events on a contract and notifies via Telegram if an expected event didn't happen

## Usage with docker

```shell script
wget https://raw.githubusercontent.com/peppersec/event-monitoring/master/docker-compose.yml
vi docker-compose.yml # update env vars
docker-compose up -d
```

## Usage for development

```shell script
yarn
cp .env.example .env
yarn start
```
