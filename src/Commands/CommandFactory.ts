import { Say } from "./Say";

export class CommandFactory
{
	static createCommand(client: ITmiClient, commandName: string): ICommand
	{
		if (commandName == "say")
			return new Say(client);
	}
}