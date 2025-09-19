/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { taskCreateDescription } from './create';

import { taskDeleteDescription } from './delete';
import { taskGetDescription } from './get';
import { taskListDescription } from './list';
import { taskUpdateDescription } from './update';

const showOnlyForTasks = {
	resource: [RESOURCE.TASK],
};

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTasks,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List tasks',
				description: 'Returns a list of tasks',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get a task by ID',
				description: 'Returns a single task object by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/tasks/{{$parameter.taskId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Create',
				value: OPERATION.CREATE,
				action: 'Create a task',
				description: 'Creates a new task',
				routing: {
					request: {
						method: 'POST',
						url: '=/tasks',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update a task',
				description: 'Updates an existing task',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tasks/{{$parameter.taskId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: OPERATION.DELETE,
				action: 'Delete a task',
				description: 'Deletes a task by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tasks/{{$parameter.taskId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...taskListDescription,
	...taskGetDescription,
	...taskCreateDescription,
	...taskUpdateDescription,
	...taskDeleteDescription,
];
