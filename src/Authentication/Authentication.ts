import { readFileSync, unwatchFile } from "fs";
const axios = require('axios');

export class Authentication
{
	url: string;
	clientId: string;
	clientSecret: string;
	grantType = "refresh_token";
	accessToken: string;
	refreshToken: string;
	expiration: number;

	constructor(fileName: string)
	{
		this.url = "https://id.twitch.tv/oauth2/token";

		const file = readFileSync(fileName, 'utf-8');
		let fileJson = JSON.parse(file);
		this.clientId = fileJson.client_id;
		this.clientSecret = fileJson.client_secret;
		this.refreshToken = fileJson.refresh_token;
	}

	async connectOfRefreshAccessToken()
	{
		const params = new URLSearchParams()
		params.append('client_id', this.clientId);
		params.append('client_secret', this.clientSecret);
		params.append('grant_type', this.grantType);
		params.append('refresh_token', this.refreshToken)

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		return axios.post(this.url, params, config)
			.then((result: ConnectionResult) =>
			{
				this.accessToken = result.data.access_token;
				this.expiration = result.data.expires_in;
				return result;
			})
			.catch((err: string) =>
			{
				throw "Unable to connect : " + err;
			})
	}

	async getIdentityJson(): Promise<IdentityJson>
	{
		await this.connectOfRefreshAccessToken();

		return {
			options: { debug: true },
			identity: {
				username: 'marvinbrain',
				password: this.accessToken,
			},
			channels: [
				'beastyfr'
			]
		};
	}
}