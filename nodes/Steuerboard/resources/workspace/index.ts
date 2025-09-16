/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { workspaceGetDescription } from './get';
import { workspaceListDescription } from './list';

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
						url: '=/v1/workspaces',
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
						url: '=/v1/workspaces/{{$parameter.workspaceId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...workspaceListDescription,
	...workspaceGetDescription,
];
