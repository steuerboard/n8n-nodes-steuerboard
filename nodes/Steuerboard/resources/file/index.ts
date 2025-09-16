/* eslint-disable n8n-nodes-base/node-param-default-missing */

import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';
import { fileDeleteDescription } from './delete';
import { fileGetDescription } from './get';
import { fileListDescription } from './list';
import { fileUpdateDescription } from './update';
import { fileUploadDescription } from './upload';

const showOnlyForFiles = {
	resource: [RESOURCE.FILE],
};

export const fileDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForFiles,
		},
		options: [
			{
				name: 'List',
				value: OPERATION.LIST,
				action: 'List files',
				description: 'Returns a paginated list of files',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/files',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Upload',
				value: OPERATION.CREATE,
				action: 'Upload a file',
				description: 'Uploads a new file',
				routing: {
					request: {
						method: 'POST',
						url: '=/v1/files',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: OPERATION.GET,
				action: 'Get a file by ID',
				description: 'Returns a single file object by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/files/{{$parameter.fileId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: OPERATION.DELETE,
				action: 'Delete a file',
				description: 'Deletes a file by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/files/{{$parameter.fileId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: OPERATION.UPDATE,
				action: 'Update a file',
				description: 'Updates a file by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/v1/files/{{$parameter.fileId}}',
						headers: {
							'x-client-id': '={{ $parameter.clientId }}',
						},
					},
				},
			},
		],
		default: OPERATION.LIST,
	},
	...fileListDescription,
	...fileGetDescription,
	...fileUploadDescription,
	...fileDeleteDescription,
	...fileUpdateDescription,
];
