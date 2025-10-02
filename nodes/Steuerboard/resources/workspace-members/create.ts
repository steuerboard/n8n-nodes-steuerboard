import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceMemberCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.WORKSPACE_MEMBER],
};

export const workspaceMemberCreateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceMemberCreate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForWorkspaceMemberCreate },
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'Identifier of the user that should be added to the workspace',
		displayOptions: { show: showOnlyForWorkspaceMemberCreate },
		routing: {
			request: {
				body: {
					userId: '={{ $value }}',
				},
			},
		},
	},
];
