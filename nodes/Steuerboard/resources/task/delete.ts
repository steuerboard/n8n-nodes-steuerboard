import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForTaskDelete = {
	operation: [OPERATION.DELETE],
	resource: [RESOURCE.TASK],
};

export const taskDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task to delete',
		displayOptions: { show: showOnlyForTaskDelete },
		routing: {
			send: {
				type: 'query',
				property: 'taskId',
			},
		},
	},
];
