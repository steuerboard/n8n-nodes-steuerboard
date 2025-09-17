import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForTaskGet = {
	operation: [OPERATION.GET],
	resource: [RESOURCE.TASK],
};

export const taskGetDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task to get',
		displayOptions: { show: showOnlyForTaskGet },
		routing: {
			send: {
				type: 'query',
				property: 'taskId',
			},
		},
	},
];
