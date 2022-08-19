import { Authentication } from "./Authentication/Authentication";
import { CommandFactory } from "./Commands/CommandFactory";

var tmi = require('tmi.js');

export class Bot
{
	authent: Authentication;
	client: any;

	constructor()
	{
		this.authent = new Authentication("dist/authSettings.json");
		this.authent.getIdentityJson()
			.then(authJson =>
			{
				this.client = new tmi.client(authJson);

				// Register our event handlers (defined below)
				this.client.on('message', this.onMessageHandler);
				this.client.on('connected', this.onConnectedHandler);
				this.client.connect();
			})
	}

	// Called every time a message comes in
	onMessageHandler(target: string, context: any, msg: string, self: any)
	{
		if (self) { return; } // Ignore messages from the bot
		let that: any = this;

		// Remove whitespace from chat message
		const commandName = msg.trim();

		// If the command is known, let's execute it
		if (commandName === '!dice')
		{
			const num = 6;
			CommandFactory.createCommand(that, 'say').exec(target, `You rolled a ${num}`);

			console.log(`* Executed ${commandName} command`);
		} else
		{
			console.log(`* Unknown command ${commandName}`);
		}
	}

	// Called every time the bot connects to Twitch chat
	onConnectedHandler(addr: string, port: number)
	{
		console.log(`* Connected to ${addr}:${port}`);
	}

}