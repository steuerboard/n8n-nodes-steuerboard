import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceUpdate = {
	operation: [OPERATION.UPDATE],
	resource: [RESOURCE.WORKSPACE],
};

export const workspaceUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceUpdate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace to update',
		displayOptions: { show: showOnlyForWorkspaceUpdate },
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'The new name of the workspace',
		displayOptions: { show: showOnlyForWorkspaceUpdate },
		routing: {
			request: {
				body: {
					name: '={{ $value }}',
				},
			},
		},
	},
];
