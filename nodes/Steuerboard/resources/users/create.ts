import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientUserCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.USER],
};

export const clientUserCreateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForClientUserCreate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'name@email.com',
		description: 'Email address that should receive the invitation',
		displayOptions: { show: showOnlyForClientUserCreate },
		routing: {
			request: {
				body: {
					email: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		default: 'client_admin',
		required: true,
		description: 'Role to assign to the invited user',
		displayOptions: { show: showOnlyForClientUserCreate },
		options: [
			{
				name: 'Client Admin',
				value: 'client_admin',
				description: 'Administrator role with full access',
			},
			{
				name: 'Client User',
				value: 'client_user',
				description: 'Regular user role with limited access',
			},
		],
		routing: {
			request: {
				body: {
					role: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Workspace IDs',
		name: 'workspaceIds',
		type: 'string',
		default: '',
		description: 'Optional comma-separated list of workspace IDs the user should join immediately',
		displayOptions: { show: showOnlyForClientUserCreate },
		routing: {
			request: {
				body: {
					workspaceIds: '={{ $value ? $value.split(",").map(id => id.trim()) : undefined }}',
				},
			},
		},
	},
];
