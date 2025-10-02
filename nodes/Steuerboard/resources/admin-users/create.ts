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
		displayName: 'Role ID',
		name: 'roleId',
		type: 'string',
		default: '',
		required: true,
		description: 'ID of the role to assign to the invited user',
		displayOptions: { show: showOnlyForAdminUserCreate },
		routing: {
			request: {
				body: {
					roleId: '={{ $value }}',
				},
			},
		},
	},
];
