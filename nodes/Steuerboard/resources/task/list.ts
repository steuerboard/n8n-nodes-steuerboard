import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForTaskList = {
	operation: [OPERATION.LIST],
	resource: [RESOURCE.TASK],
};

export const taskListDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		description: 'The ID of the client (optional filter)',
		displayOptions: { show: showOnlyForTaskList },
		routing: {
			request: {
				qs: {
					clientId: '={{ $value || undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		description: 'The ID of the workspace (optional filter)',
		displayOptions: { show: showOnlyForTaskList },
		routing: {
			request: {
				qs: {
					workspaceId: '={{ $value || undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForTaskList,
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		routing: {
			send: {
				type: 'query',
				property: 'limit',
				value: '={{ $parameter.returnAll ? undefined : $value }}',
			},
			output: {
				maxResults: '={{ $parameter.returnAll ? undefined : $value }}',
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: showOnlyForTaskList,
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				paginate: '={{ $value }}',
				type: 'query',
				property: 'limit',
				value: "={{ $value ? '100' : undefined }}",
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ !!($response.body.pagination?.nextCursor) }}',
						request: {
							url: '={{ $request.url }}',
							qs: {
								cursor: '={{ $response.body.pagination?.nextCursor }}',
								limit: "={{ $parameter.returnAll ? '100' : undefined }}",
								clientId: '={{ $parameter.clientId || undefined }}',
								workspaceId: '={{ $parameter.workspaceId || undefined }}',
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Cursor',
		name: 'cursor',
		type: 'string',
		default: '',
		description: 'Cursor for pagination (used to get the next page of results)',
		displayOptions: {
			show: showOnlyForTaskList,
		},
		routing: {
			request: {
				qs: {
					cursor: '={{ $value || undefined }}',
				},
			},
		},
	},
];
