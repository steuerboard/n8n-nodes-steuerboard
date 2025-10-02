/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { workspaceCreateDescription } from './create';
import { workspaceGetDescription } from './get';
import { workspaceListDescription } from './list';
import { workspaceUpdateDescription } from './update';

const showOnlyForWorkspaces = {
	resource: [RESOURCE.WORKSPACE],
};

export const workspaceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForWorkspaces,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List workspaces',
				description: 'Returns a list of workspaces',
				routing: {
					request: {
						method: 'GET',
						url: '=/workspaces',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Create',
				value: OPERATION.CREATE,
				action: 'Create a workspace',
				description: 'Creates a new workspace and returns the created workspace',
				routing: {
					request: {
						method: 'POST',
						url: '=/workspaces',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get a workspace by ID',
				description: 'Returns a single workspace object by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/workspaces/{{$parameter.workspaceId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update a workspace',
				description: 'Updates a workspace by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/workspaces/{{$parameter.workspaceId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...workspaceCreateDescription,
	...workspaceGetDescription,
	...workspaceListDescription,
	...workspaceUpdateDescription,
];
