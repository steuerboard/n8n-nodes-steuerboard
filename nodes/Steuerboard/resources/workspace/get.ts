import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.WORKSPACE],
};

export const workspaceGetDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceGet },
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace to get',
		displayOptions: { show: showOnlyForWorkspaceGet },
		routing: {
			send: {
				type: 'query',
				property: 'workspaceId',
			},
		},
	},
];
