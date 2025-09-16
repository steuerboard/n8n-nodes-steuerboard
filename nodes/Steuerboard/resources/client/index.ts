/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { clientGetDescription } from './get';
import { clientListDescription } from './list';

const showOnlyForClients = {
	resource: [RESOURCE.CLIENT],
};

export const clientDescription: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Client',
				value: RESOURCE.CLIENT,
			},
		],
		default: RESOURCE.CLIENT,
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForClients,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List clients',
				description: 'Returns a list of clients',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/clients',
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get a client by ID',
				description: 'Returns a single client object by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/admin/clients/{{$parameter.clientId}}',
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...clientListDescription,
	...clientGetDescription,
];
