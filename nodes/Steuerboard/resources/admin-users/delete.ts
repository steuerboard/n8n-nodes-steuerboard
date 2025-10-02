import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForAdminUserDelete = {
	operation: [OPERATION.DELETE],
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserDeleteDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the accountant user to delete',
		displayOptions: { show: showOnlyForAdminUserDelete },
	},
];
