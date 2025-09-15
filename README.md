# n8n-nodes-steuerboard

This is an n8n community node. It lets you use Steuerboard API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Clients
  - List clients
  - Get client by ID

## Credentials

This node uses API key authentication via an Authorization: Bearer header.

How to get an API key:

- Create an account at steuerboard.net and sign in.
- In your dashboard, open the API keys section and create a new API key.
- Copy the key value. Keep it secure.
- Details and up-to-date instructions: see Authentication.

In n8n, create credentials of type Steuerboard API and set:

API Key: your generated key
Requests are sent with:

Authorization: Bearer YOUR_API_KEY

## Compatibility

Compatible with n8n@1.60.0 or later

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Steuerboard docs](https://docs.steuerboard.com)
- [Steuerboard Website](https://steuerboard.net)