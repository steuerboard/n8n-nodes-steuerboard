import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForWorkspaceMemberList = {
	operation: [OPERATION.LIST],
	resource: [RESOURCE.WORKSPACE_MEMBER],
};

export const workspaceMemberListDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForWorkspaceMemberList },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForWorkspaceMemberList },
	},
];
