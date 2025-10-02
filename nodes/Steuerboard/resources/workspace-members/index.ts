/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { workspaceMemberCreateDescription } from './create';
import { workspaceMemberDeleteDescription } from './delete';
import { workspaceMemberListDescription } from './list';

const showOnlyForWorkspaceMembers = {
	resource: [RESOURCE.WORKSPACE_MEMBER],
};

export const workspaceMemberDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkspaceMembers,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List workspace members',
				description: 'Returns workspace members for a workspace',
				routing: {
					request: {
						method: 'GET',
						url: '=/workspaces/{{$parameter.workspaceId}}/members',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Create',
				value: OPERATION.CREATE,
				action: 'Create a workspace member',
				description: 'Creates a new workspace member',
				routing: {
					request: {
						method: 'POST',
						url: '=/workspaces/{{$parameter.workspaceId}}/members',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: OPERATION.DELETE,
				action: 'Remove a workspace member',
				description: 'Removes a workspace member from a workspace',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/workspaces/{{$parameter.workspaceId}}/members',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...workspaceMemberListDescription,
	...workspaceMemberCreateDescription,
	...workspaceMemberDeleteDescription,
];
