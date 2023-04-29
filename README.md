[![damiaoterto - nestjs-discord-transporter](https://img.shields.io/static/v1?label=damiaoterto&message=nestjs-discord-transporter&color=green&logo=github)](https://github.com/damiaoterto/nestjs-discord-transporter "Go to GitHub repo")
[![GitHub tag](https://img.shields.io/github/tag/damiaoterto/nestjs-discord-transporter?include_prereleases=&sort=semver&color=green)](https://github.com/damiaoterto/nestjs-discord-transporter/releases/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)
[![stars - nestjs-discord-transporter](https://img.shields.io/github/stars/damiaoterto/nestjs-discord-transporter?style=social)](https://github.com/damiaoterto/nestjs-discord-transporter)
[![forks - nestjs-discord-transporter](https://img.shields.io/github/forks/damiaoterto/nestjs-discord-transporter?style=social)](https://github.com/damiaoterto/nestjs-discord-transporter)

# Description

A Discord event listener for Nest.js based on [discord.js](https://discord.js.org/) package.

# Installation

> **Warning**
> Assuming you have installed the `@nestjs/microservices` package.

**Using NPM:**

    npm install discord.js nestjs-discord-transporter

**Using Yarn:**

    yarn add discord.js nestjs-discord-transporter

# Quick Start
### Overview
To use the Discord transporter, pass the following options object to the createMicroservice() method on ``main.ts`` file:

```typescript
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DiscordTransporter } from 'nestjs-discord-transporter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      strategy: new DiscordTransporter({
        token: '<you-token>', // or set the environment var DISCORD_TOKEN
        intents: [], // optional param
        partials: [], // optional param
        prefix: 'command:', // optional if receive commands
      }),
    },
  );
  await app.listen();
}
bootstrap();
```

### Transporter options

| Param  | Required | Description
| ------------- | ------------- | ------------- |
| token | true  | The discord access token [access here](https://discord.com/developers/applications)  |
| intents  | false | The bot intents [access docs here](https://discordjs.guide/popular-topics/intents.html#privileged-intents)  |
| partials  | false | The bot partials [access docs here](https://discordjs.guide/popular-topics/partials.html#enabling-partials)  |
| prefix | false  | if receive specific commands |

### Request-response

To create a message handler based on the request-response paradigm use the ``@MessagePattern()`` decorator, which is imported from the ``@nestjs/microservices`` package. This decorator should be used only within the controller classes since they are the entry points for your application. Using them inside providers won't have any effect as they are simply ignored by Nest runtime.

**app.controller.ts**

```typescript
import { Controller } from '@nestjs/common';
import { Message } from 'discord.js';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('messageCreate')
  getHello(message: Message) {
    // you message handler here
  }
}

```
for more information on the message object  [click here](https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files)

# Dependencies

``discord.js: ``[Documentation](https://discordjs.guide)

``Nest.js: ``[Documentation](https://docs.nestjs.com/microservices/basics)
