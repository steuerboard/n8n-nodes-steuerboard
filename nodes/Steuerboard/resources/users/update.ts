import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientUserUpdate = {
	operation: [OPERATION.UPDATE],
	resource: [RESOURCE.USER],
};

export const clientUserUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForClientUserUpdate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the user to update',
		displayOptions: { show: showOnlyForClientUserUpdate },
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
				description: 'The first name of the user',
				routing: { request: { body: { firstName: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the user',
				routing: { request: { body: { lastName: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
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
				default: 'client_admin',
				description: 'The role of the user',
				routing: { request: { body: { role: '={{ $value || undefined }}' } } },
			},
		],
		displayOptions: { show: showOnlyForClientUserUpdate },
	},
];
