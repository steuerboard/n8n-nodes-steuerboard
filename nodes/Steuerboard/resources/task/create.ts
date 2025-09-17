import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForTaskCreate = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.TASK],
};

export const taskCreateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForTaskCreate },
		// Header is set in operation routing at index level
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		description: 'The title of the task',
		displayOptions: { show: showOnlyForTaskCreate },
		routing: {
			request: {
				body: {
					title: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForTaskCreate },
		routing: {
			request: {
				body: {
					workspaceId: '={{ $value }}',
				},
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		default: '',
		description: 'The text of the task',
		displayOptions: { show: showOnlyForTaskCreate },
		routing: {
			request: {
				body: {
					text: '={{ $value || undefined }}',
				},
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		description: 'The due date of the task in ISO 8601 format',
		displayOptions: { show: showOnlyForTaskCreate },
		routing: {
			request: {
				body: {
					dueDate: '={{ $value || undefined }}',
				},
			},
		},
	},
];
