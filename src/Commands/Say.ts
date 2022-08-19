import { Command } from "./Command";

export class Say extends Command
{
	constructor(client: ITmiClient)
	{
		super(client, "say");
	}

	exec(target: string, message: string): void
	{
		this.client.say(target, message);
	}
}

