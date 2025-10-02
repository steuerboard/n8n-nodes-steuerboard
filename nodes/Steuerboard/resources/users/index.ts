/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { clientUserCreateDescription } from './create';
import { clientUserDeleteDescription } from './delete';
import { clientUserGetDescription } from './get';
import { clientUserListDescription } from './list';
import { clientUserUpdateDescription } from './update';

const showOnlyForClientUsers = {
	resource: [RESOURCE.USER],
};

export const clientUserDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForClientUsers,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List users',
				description: 'Returns a paginated list of client users',
				routing: {
					request: {
						method: 'GET',
						url: '=/users',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get a user by ID',
				description: 'Returns a single client user by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.userId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Invite',
				value: OPERATION.CREATE,
				action: 'Invite a user',
				description: 'Invites a new client user and returns the created record',
				routing: {
					request: {
						method: 'POST',
						url: '=/users',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update a user',
				description: 'Updates a client user by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/users/{{$parameter.userId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: OPERATION.DELETE,
				action: 'Delete a user',
				description: 'Deletes a client user by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/users/{{$parameter.userId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...clientUserListDescription,
	...clientUserGetDescription,
	...clientUserCreateDescription,
	...clientUserUpdateDescription,
	...clientUserDeleteDescription,
];
