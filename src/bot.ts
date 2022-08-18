import { BotOptions } from "./botoption";
var tmi = require('tmi.js');

export class Bot
{
	options: BotOptions;
	client: any

	constructor()
	{
		this.options = new BotOptions('dist/authSettings.json');
		this.client = new tmi.client(this.options.getIdentityJson());

		// Register our event handlers (defined below)
		this.client.on('message', this.onMessageHandler);
		this.client.on('connected', this.onConnectedHandler);
		this.client.connect();

	}


	// Called every time a message comes in
	onMessageHandler(target: string, context: any, msg: string, self: any)
	{
		if (self) { return; } // Ignore messages from the bot

		// Remove whitespace from chat message
		const commandName = msg.trim();

		// If the command is known, let's execute it
		if (commandName === '!dice')
		{
			const num = this.rollDice();
			this.client.say(target, `You rolled a ${num}`);
			console.log(`* Executed ${commandName} command`);
		} else
		{
			console.log(`* Unknown command ${commandName}`);
		}
	}

	// Function called when the "dice" command is issued
	rollDice()
	{
		const sides = 6;
		return Math.floor(Math.random() * sides) + 1;
	}

	// Called every time the bot connects to Twitch chat
	onConnectedHandler(addr: string, port: number)
	{
		console.log(`* Connected to ${addr}:${port}`);
	}

}