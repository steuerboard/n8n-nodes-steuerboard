import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForFileGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.FILE],
};

export const fileGetDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForFileGet },
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the file to get',
		displayOptions: { show: showOnlyForFileGet },
	},
];
