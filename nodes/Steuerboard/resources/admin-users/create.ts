import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForAdminUserCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserCreateDescription: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'name@email.com',
		description: 'Email address that should receive the invitation',
		displayOptions: { show: showOnlyForAdminUserCreate },
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
		type: 'string',
		default: 'user',
		required: true,
		description: "Role to assign to the invited user. Can be 'admin', 'user', or a custom role ID.",
		placeholder: 'admin, user, or custom role ID',
		displayOptions: { show: showOnlyForAdminUserCreate },
		routing: {
			request: {
				body: {
					role: '={{ $value }}',
				},
			},
		},
	},
];
