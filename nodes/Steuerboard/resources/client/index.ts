/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { clientCreateDescription } from './create';
import { clientGetDescription } from './get';
import { clientListDescription } from './list';
import { clientUpdateDescription } from './update';

const showOnlyForClients = {
	resource: [RESOURCE.CLIENT],
};

export const clientDescription: INodeProperties[] = [
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
				name: 'Create',
				value: OPERATION.CREATE,
				action: 'Create a client',
				description: 'Creates a new client for the accountant',
				routing: {
					request: {
						method: 'POST',
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
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update a client',
				description: 'Updates a client by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/admin/clients/{{$parameter.clientId}}',
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...clientCreateDescription,
	...clientGetDescription,
	...clientListDescription,
	...clientUpdateDescription,
];
