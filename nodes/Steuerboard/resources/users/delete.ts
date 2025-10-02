import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientUserDelete = {
	operation: [OPERATION.DELETE],
	resource: [RESOURCE.USER],
};

export const clientUserDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForClientUserDelete },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user to remove from the client',
		displayOptions: { show: showOnlyForClientUserDelete },
	},
];
