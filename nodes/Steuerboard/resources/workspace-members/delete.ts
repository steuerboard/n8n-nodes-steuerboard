import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceMemberDelete = {
	operation: [OPERATION.DELETE],
	resource: [RESOURCE.WORKSPACE_MEMBER],
};

export const workspaceMemberDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceMemberDelete },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForWorkspaceMemberDelete },
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'Identifier of the user that should be removed from the workspace',
		displayOptions: { show: showOnlyForWorkspaceMemberDelete },
		routing: {
			request: {
				body: {
					userId: '={{ $value }}',
				},
			},
		},
	},
];
