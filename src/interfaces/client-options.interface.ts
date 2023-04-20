import { GatewayIntentBits, Partials } from 'discord.js';

export interface ClientOptions {
  prefix: string;
  token: string;
  intents: GatewayIntentBits[];
  partials: Partials[];
}
