import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

const showOnlyForTaskUpdate = {
	operation: [OPERATION.UPDATE],
	resource: [RESOURCE.TASK],
};

export const taskUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the task to update',
		displayOptions: { show: showOnlyForTaskUpdate },
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'The title of the task',
				routing: { request: { body: { title: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: '',
				description: 'The text of the task',
				routing: { request: { body: { text: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'string',
				default: '',
				description: 'The due date of the task in ISO 8601 format',
				routing: { request: { body: { dueDate: '={{ $value || undefined }}' } } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Accepted', value: 'ACCEPTED' },
					{ name: 'Declined', value: 'DECLINED' },
					{ name: 'In Progress', value: 'IN_PROGRESS' },
					{ name: 'In Review', value: 'IN_REVIEW' },
					{ name: 'Open', value: 'OPEN' },
				],
				default: 'OPEN',
				description: 'The status of the task',
				routing: { request: { body: { status: '={{ $value || undefined }}' } } },
			},
		],
		displayOptions: { show: showOnlyForTaskUpdate },
	},
];
