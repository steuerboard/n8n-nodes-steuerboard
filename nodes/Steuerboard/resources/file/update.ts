import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForFileUpdate = {
	operation: [OPERATION.UPDATE],
	resource: [RESOURCE.FILE],
};

export const fileUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForFileUpdate },
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the file to update',
		displayOptions: { show: showOnlyForFileUpdate },
		routing: {
			send: {
				type: 'query',
				property: 'fileId',
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		typeOptions: {
			multipleValueButtonText: 'Add Field',
		},
		displayOptions: { show: showOnlyForFileUpdate },
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New file name',
				routing: { request: { body: { name: '={{ $value }}' } } },
			},
			{
				displayName: 'Label IDs',
				name: 'labelIds',
				type: 'string',
				default: '',
				description: 'JSON array of label IDs, e.g. ["id1","id2"]',
				routing: { request: { body: { labelIds: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
				description: 'Folder ID',
				routing: { request: { body: { folderId: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
				description: 'Task ID',
				routing: { request: { body: { taskId: '={{ $value || undefined }}' } } },
			},
		],
		routing: {
			send: {
				type: 'body',
				property: '={{Object.keys($value || {}).length ? undefined : undefined}}',
			},
		},
	},
];
