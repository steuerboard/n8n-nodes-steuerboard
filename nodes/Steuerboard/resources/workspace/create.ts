import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.WORKSPACE],
};

export const workspaceCreateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceCreate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'The name of the workspace',
		displayOptions: { show: showOnlyForWorkspaceCreate },
		routing: {
			request: {
				body: {
					name: '={{ $value }}',
				},
			},
		},
	},
];
