import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { Message } from './types/message';
import { ClientOptions } from './interfaces/client-options.interface';

export class DiscordTransporter
  extends Server
  implements CustomTransportStrategy {

  private readonly client: Client;

  constructor(private readonly options?: Partial<ClientOptions>) {
    super();

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        ...this.options?.intents || [],
      ],
      partials: [
        Partials.Channel,
        ...this.options?.partials || [],
      ],
    });
  }

  async listen(callback: () => any) {
    this.client.on('ready', () => {
      Logger.log('Discord client listening event', 'Discord Client');
    });

    this.client.on('messageCreate', async (message: Message) => {
      const messageHandler = this.messageHandlers.get('messageCreate');

      if (messageHandler) {
        await messageHandler(message);
      }
    });

    await this.client.login(this.options?.token || process.env.DISCORD_TOKEN);

    callback();
  }

  close() {
    this.client.destroy();
  }
}
