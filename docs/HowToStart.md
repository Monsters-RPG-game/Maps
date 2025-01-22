# How to start - docs

Last update: 07.01.2025

This file will try to explain, how to start this project, setup configs and databases.

> [!IMPORTANT]
> Before setting up this app, you should have already prepared [Gateway service](https://github.com/Monsters-RPG-game/Gateway). This service is essential, for starting this app. Unless you are planning on testing this, gateway is not required.

TLDR;
1. [External connections](#1-external-connections)
2. [Configs](#2-configs)
3. [Preparing data](#3-preparing-data)
4. [Networking](#4-networking)

## 1. External connections

This application connects to:
- MongoDb
- RabbitMQ

MongoDB is used to store data related to authentications.

RabbitMq is used to send messages between other microservices

> [!TIP]
> In addition to add 'connections', there are microservices, related to this project. If you want to set up whole infrastructure, please refear to [Head](https://github.com/Monsters-RPG-game/Head) project. Head will explain how to set up whole infrastructure.

## 2. Configs

This application uses 3 config files:
- devConfig.json
- prodConfig.json
- testConfig.json

DevConfig will be used, if you run your application with NODE_ENV=development. This config should be used while working on this application

ProdConfig will be used, if you run your application with NODE_ENV=production. This should be used in production env

TestConfig will be used, if you run your application on dev servers. This config only differs from production, that in code it will log debug logs and should connect to dev database.

Each config includes few elements:
```json
{
  "amqpURL": "amqp://user:password@address:port",
  "mongoURL": "mongodb://user:password@adress:port"
}
```

mongoURL is address for mongoDB

rabbitURL is address for rabbitMQ

## 3. Preparing data

There is no need to prepare any data for this service. MongoDB will automatically set up everything you will need for this app to work. This might change in the future, but should be communicated. 
