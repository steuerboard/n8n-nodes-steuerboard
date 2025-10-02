import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientUserGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.USER],
};

export const clientUserGetDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForClientUserGet },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user to retrieve',
		displayOptions: { show: showOnlyForClientUserGet },
	},
];
