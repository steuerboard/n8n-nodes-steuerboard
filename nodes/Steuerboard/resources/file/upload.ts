import type { INodeProperties } from 'n8n-workflow';
import { OPERATION, RESOURCE } from '../../shared/constants';

interface AdditionalFields {
	name?: string;
	folderId?: string;
	taskId?: string;
	labelIds?: string;
}

const showOnlyForFileUpload = {
	operation: [OPERATION.CREATE],
	resource: [RESOURCE.FILE],
};

export const fileUploadDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the client',
		displayOptions: { show: showOnlyForFileUpload },
	},
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the workspace',
		displayOptions: { show: showOnlyForFileUpload },
	},
	{
		displayName: 'File',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		description: 'Name of the binary property to upload',
		displayOptions: { show: showOnlyForFileUpload },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		typeOptions: { multipleValueButtonText: 'Add Field' },
		displayOptions: { show: showOnlyForFileUpload },
		default: {},
		options: [
			{
				displayName: 'Label IDs (JSON)',
				name: 'labelIds',
				type: 'string',
				default: '',
				description: 'JSON array of label IDs, e.g. ["id1","id2"]',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Folder ID',
				name: 'folderId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Upload',
		name: 'upload',
		type: 'hidden',
		default: '',
		displayOptions: { show: showOnlyForFileUpload },
		routing: {
			send: {
				preSend: [
					async function (this, requestOptions) {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', 0) as string;
						const workspaceId = this.getNodeParameter('workspaceId', 0) as string;
						const additionalFields = this.getNodeParameter(
							'additionalFields',
							0,
							{},
						) as AdditionalFields;

						// Get binary data using n8n helpers
						const binaryData = this.helpers.assertBinaryData(binaryPropertyName, 0);
						const buffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName, 0);

						// Build multipart boundary
						const boundary = `----n8nFormBoundary${Date.now()}${Math.random().toString(36)}`;

						// Build multipart body manually
						const parts: Buffer[] = [];
						const textEncoder = new TextEncoder();

						// Add workspaceId field
						parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
						parts.push(
							Buffer.from(
								textEncoder.encode(`Content-Disposition: form-data; name="workspaceId"\r\n\r\n`),
							),
						);
						parts.push(Buffer.from(textEncoder.encode(`${workspaceId}\r\n`)));

						// Add optional fields
						if (additionalFields.name) {
							parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
							parts.push(
								Buffer.from(
									textEncoder.encode(`Content-Disposition: form-data; name="name"\r\n\r\n`),
								),
							);
							parts.push(Buffer.from(textEncoder.encode(`${additionalFields.name}\r\n`)));
						}

						if (additionalFields.folderId) {
							parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
							parts.push(
								Buffer.from(
									textEncoder.encode(`Content-Disposition: form-data; name="folderId"\r\n\r\n`),
								),
							);
							parts.push(Buffer.from(textEncoder.encode(`${additionalFields.folderId}\r\n`)));
						}

						if (additionalFields.taskId) {
							parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
							parts.push(
								Buffer.from(
									textEncoder.encode(`Content-Disposition: form-data; name="taskId"\r\n\r\n`),
								),
							);
							parts.push(Buffer.from(textEncoder.encode(`${additionalFields.taskId}\r\n`)));
						}

						if (additionalFields.labelIds) {
							parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
							parts.push(
								Buffer.from(
									textEncoder.encode(`Content-Disposition: form-data; name="labelIds"\r\n\r\n`),
								),
							);
							parts.push(Buffer.from(textEncoder.encode(`${additionalFields.labelIds}\r\n`)));
						}

						// Add file field
						const fileName = binaryData.fileName || 'file';
						const mimeType = binaryData.mimeType || 'application/octet-stream';

						parts.push(Buffer.from(textEncoder.encode(`--${boundary}\r\n`)));
						parts.push(
							Buffer.from(
								textEncoder.encode(
									`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`,
								),
							),
						);
						parts.push(Buffer.from(textEncoder.encode(`Content-Type: ${mimeType}\r\n\r\n`)));
						parts.push(buffer);
						parts.push(Buffer.from(textEncoder.encode(`\r\n`)));

						// End boundary
						parts.push(Buffer.from(textEncoder.encode(`--${boundary}--\r\n`)));

						// Combine all parts
						const body = Buffer.concat(parts);

						// Set request options
						requestOptions.body = body;
						requestOptions.headers = {
							...requestOptions.headers,
							'Content-Type': `multipart/form-data; boundary=${boundary}`,
							'Content-Length': body.length.toString(),
						};
						requestOptions.json = false;

						return requestOptions;
					},
				],
			},
		},
	},
];
