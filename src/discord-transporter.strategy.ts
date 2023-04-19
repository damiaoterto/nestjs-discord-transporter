import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Client, GatewayIntentBits } from 'discord.js';
import { ClientOptions } from './interfaces/client-options.interface';

export class DiscordTransporter
  extends Server
  implements CustomTransportStrategy {

  private readonly client: Client;

  constructor(private readonly options?: ClientOptions) {
    super();

    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
      ],
    });
  }

  async listen(callback: () => any) {
    this.client.on('ready', async () => {
      this.logger.log('Discord client listening event');
    });

    await this.client.login(this.options?.token || process.env.DISCORD_TOKEN);

    callback();
  }

  close() {
    this.client.destroy();
  }
}
