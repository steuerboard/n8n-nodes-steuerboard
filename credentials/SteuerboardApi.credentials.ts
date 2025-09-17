import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SteuerboardApi implements ICredentialType {
	name = 'steuerboardApi';

	displayName = 'Steuerboard API';

	icon: Icon = {
		light: 'file:../icons/steuerboard.svg',
		dark: 'file:../icons/steuerboard.svg',
	};

	documentationUrl = 'https://docs.steuerboard.com/api-keys';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: { password: true },
			description: 'Create an API key in Steuerboard and paste the key here',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.steuerboard.com/v1',
			description: 'Base URL of the Steuerboard API. For local dev, e.g. http://localhost:8080/v1',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/ping',
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
			method: 'GET',
		},
	};
}
