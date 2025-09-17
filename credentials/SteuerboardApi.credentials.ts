import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
import { STEUERBOARD_API_URL } from '../nodes/Steuerboard/shared/constants';

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
			baseURL: STEUERBOARD_API_URL,
			url: '/ping',
			headers: {
				Authorization: '={{"Bearer " + $credentials.apiKey}}',
			},
			method: 'GET',
		},
	};
}
