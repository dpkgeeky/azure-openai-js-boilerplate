# Open AI JS Boilerplate

## Install

```sh
	npm install
```

## Configuration

Create a .env file and add the below environment variables

AZURE_OPENAI_KEY="YOUR OPEN AI API KEY"
AZURE_OPENAI_ENDPOINT="YOUR OPEN AI ENDPOINT"

## run Chat Combletion

```sh
	node ./src/ChatCompletion.js
```

## Run chatbot example

```sh
	node ./src/InteractiveChatCompletion.js
```

## run Text Embedding

```sh
	node ./src/TextEmbedding.js
```

## Usage

Create a .env file in the root of your project directory and define the following environment variables:

AZURE_OPENAI_ENDPOINT: The endpoint URL for the OpenAI API.
AZURE_OPENAI_KEY: The API key for accessing the OpenAI API.
Example .env file:

### ./src/azureOpenAIClient

This module provides a client for accessing the OpenAI API using the configuration specified in the .env file. It also includes an enum for the model names used in the OpenAI API.

1. Use the openAIClient instance to access the OpenAI API methods.
2. Access the provided enum DEPLOYMENTS to get the names of the available models.

#### Examples

1. Create Completion

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const history = [
  { role: "system", content: "You are a helpful assistant." },
  {
    role: "user",
    content: "Does Azure OpenAI support customer managed keys?",
  },
  {
    role: "assistant",
    content: "Yes, customer managed keys are supported by Azure OpenAI",
  },
  {
    role: "user",
    content: "Do other Azure Cognitive Services support this too",
  };
];
const createCompletion = async (history) => {
  return openAIClient.getChatCompletions(DEPLOYMENTS.COMPLETION, history);
};
```

> You can find a complete code snippet in the ./src/ChatCompletion.js module.

2.  Create Embeddings

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const createEmbeddings = async (input) => {
  return openAIClient.getEmbeddings(DEPLOYMENTS.EMBEDDING, input);
};
```

> You can find a complete code snippet in the ./src/TextEmbedding.js module.

For an interactive chatbot sample programm please refer to the CompletionChatBot.js module.
Run the below command to test the chatbot.

```sh
	node ./src/CompletionChatBot.js
```
