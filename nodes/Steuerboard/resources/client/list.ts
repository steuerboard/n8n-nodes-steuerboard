import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForClientList = {
	operation: [OPERATION.LIST],
	resource: [RESOURCE.CLIENT],
};

export const clientListDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForClientList,
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
			show: showOnlyForClientList,
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
								customId: '={{ $parameter.filters?.customId }}',
								archived: '={{ $parameter.filters?.archived }}',
								limit: "={{ $parameter.returnAll ? '100' : undefined }}",
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Filter',
		},
		displayOptions: {
			show: showOnlyForClientList,
		},
		default: {},
		options: [
			{
				displayName: 'Custom ID',
				name: 'customId',
				type: 'string',
				default: '',
				description: 'Return only clients with this custom ID',
				routing: {
					request: {
						qs: {
							customId: '={{$value}}',
						},
					},
				},
			},

			{
				displayName: 'Archived',
				name: 'archived',
				type: 'boolean',
				default: false,
				description: 'Whether to return archived clients',
				routing: {
					request: {
						qs: {
							archived: '={{$value}}',
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
				routing: {
					request: {
						qs: {
							cursor: '={{$value}}',
						},
					},
				},
			},
		],
	},
];
