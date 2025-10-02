/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { adminUserCreateDescription } from './create';
import { adminUserDeleteDescription } from './delete';
import { adminUserGetDescription } from './get';
import { adminUserListDescription } from './list';
import { adminUserUpdateDescription } from './update';

const showOnlyForAdminUsers = {
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAdminUsers,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List accountant users',
				description: 'Returns a paginated list of accountant users',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/users',
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get an accountant user by ID',
				description: 'Returns a single accountant user by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Invite',
				value: OPERATION.CREATE,
				action: 'Invite an accountant user',
				description: 'Invites a new accountant user and returns the created record',
				routing: {
					request: {
						method: 'POST',
						url: '=/admin/users',
					},
				},
			},
			{
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update an accountant user',
				description: 'Updates an accountant user by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/admin/users/{{$parameter.userId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: OPERATION.DELETE,
				action: 'Delete an accountant user',
				description: 'Deletes an accountant user by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/admin/users/{{$parameter.userId}}',
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...adminUserListDescription,
	...adminUserGetDescription,
	...adminUserCreateDescription,
	...adminUserUpdateDescription,
	...adminUserDeleteDescription,
];
