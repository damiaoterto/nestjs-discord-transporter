import { describe, beforeEach, afterEach, it, expect, vi, Mock } from 'vitest';
import { Client } from 'discord.js';
import { Server } from '@nestjs/microservices';
import { DiscordTransporter, ClientOptions } from '@lib'

describe('Discord Transporter Strategy', () => {
  let transporter: DiscordTransporter;
  let mockCallback: Mock;

  const mockClientOptions: ClientOptions = {
    token: 'mockToken',
  }

  beforeEach(async () => {
    transporter = new DiscordTransporter(mockClientOptions);
    mockCallback = vi.fn();
    vi.spyOn(Client.prototype, 'login').mockResolvedValue('');
    vi.spyOn(Client.prototype, 'destroy');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be defined', () => {
    expect(transporter).toBeDefined();
  });

  it('should extend Server and implement CustomTransportStrategy', () => {
    expect(transporter).toBeInstanceOf(Server);
    expect(transporter).toHaveProperty('listen');
    expect(transporter).toHaveProperty('close');
  });

  it('should call the client login method with the provided token', async () => {
    await transporter.listen(mockCallback);
    expect(Client.prototype.login).toHaveBeenCalledWith(mockClientOptions.token);
  });

  it('should call the client login method with the default token if none is provided', async () => {
    vi.stubEnv('DISCORD_TOKEN', 'mockToken')

    const transporterWithoutToken = new DiscordTransporter();

    await transporterWithoutToken.listen(mockCallback);
    expect(Client.prototype.login).toHaveBeenCalledWith('mockToken');
  });

  it('should call the provided callback after the client is ready', async () => {
    await transporter.listen(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
  });

  it('should call the client destroy method', () => {
    transporter.close();
    expect(Client.prototype.destroy).toHaveBeenCalled();
  });
});
