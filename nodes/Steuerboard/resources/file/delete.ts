import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForFileDelete = {
	operation: [OPERATION.DELETE],
	resource: [RESOURCE.FILE],
};

export const fileDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForFileDelete },
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the file to delete',
		displayOptions: { show: showOnlyForFileDelete },
		routing: {
			send: {
				type: 'query',
				property: 'fileId',
			},
		},
	},
];
