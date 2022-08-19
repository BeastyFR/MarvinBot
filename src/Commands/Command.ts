export abstract class Command implements ICommand
{
	client: ITmiClient;
	name: string;

	constructor(client: ITmiClient, commandName: string)
	{
		this.client = client;
		this.name = commandName;
	}

	abstract exec(...args: any[]): void
}
