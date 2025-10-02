import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForAdminUserGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserGetDescription: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the accountant user to retrieve',
		displayOptions: { show: showOnlyForAdminUserGet },
	},
];
