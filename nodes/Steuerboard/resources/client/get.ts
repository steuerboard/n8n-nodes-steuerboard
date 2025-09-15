import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.CLIENT],
};

export const clientGetDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		routing: {
			send: {
				type: 'query',
				property: 'clientId',
			},
		},
		description: 'The ID of the client to get',
		displayOptions: { show: showOnlyForClientGet },
	},
];
