import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForAdminUserUpdate = {
	operation: [OPERATION.UPDATE],
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserUpdateDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the accountant user to update',
		displayOptions: { show: showOnlyForAdminUserUpdate },
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the accountant user',
				routing: { request: { body: { firstName: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the accountant user',
				routing: { request: { body: { lastName: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'string',
				default: '',
				description: "Role to assign to the user. Can be 'admin', 'user', or a custom role ID.",
				placeholder: 'admin, user, or custom role ID',
				routing: { request: { body: { role: '={{ $value || undefined }}' } } },
			},
		],
		displayOptions: { show: showOnlyForAdminUserUpdate },
	},
];
