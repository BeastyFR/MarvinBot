import { readFileSync } from 'fs';

type IdentityJson = {
	username: string;
	password: string;
}

export class BotOptions
{
	username: string;
	password: string;
	channels: string[];

	constructor(fileName: string)
	{
		const file = readFileSync(fileName, 'utf-8');
		let fileJson = JSON.parse(file);
		this.username = fileJson.username;
		this.password = fileJson.auth_token;
	}

	getIdentityJson(): IdentityJson
	{
		return {
			username: this.username,
			password: this.password
		}
	}
}