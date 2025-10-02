import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForAdminUserList = {
	operation: [OPERATION.LIST],
	resource: [RESOURCE.ADMIN_USER],
};

export const adminUserListDescription: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				...showOnlyForAdminUserList,
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
			show: showOnlyForAdminUserList,
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
								sort: '={{ $parameter.sort || undefined }}',
								order: '={{ $parameter.order || undefined }}',
							},
						},
					},
				},
			},
		},
	},
	{
		displayName: 'Additional Options',
		name: 'options',
		type: 'collection',
		default: {},
		placeholder: 'Add Option',
		displayOptions: { show: showOnlyForAdminUserList },
		options: [
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description: 'Cursor for pagination (used to get the next page of results)',
				routing: {
					request: {
						qs: {
							cursor: '={{ $value || undefined }}',
						},
					},
				},
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Created At', value: 'createdAt' },
					{ name: 'Email', value: 'email' },
					{ name: 'First Name', value: 'firstName' },
					{ name: 'Last Name', value: 'lastName' },
					{ name: 'Updated At', value: 'updatedAt' },
				],
				default: 'createdAt',
				description: 'The sort field of the results',
				routing: {
					request: {
						qs: {
							sort: '={{ $value }}',
						},
					},
				},
			},
			{
				displayName: 'Order',
				name: 'order',
				type: 'options',
				options: [
					{ name: 'Ascending', value: 'asc' },
					{ name: 'Descending', value: 'desc' },
				],
				default: 'desc',
				description: 'The order of the results based on the sort field',
				routing: {
					request: {
						qs: {
							order: '={{ $value }}',
						},
					},
				},
			},
		],
	},
];
