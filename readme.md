# Open AI JS Boilerplate

The OpenAI JavaScript Boilerplate is a starter template designed to accelerate the process of integrating and utilizing Azure OpenAI's deployed models in your JavaScript applications. It provides a foundation for quickly writing new use cases and leveraging the power of OpenAI's models for various tasks.

## Install

```sh
npm install
```

## Configuration

Create a .env file and add the below environment variables

- AZURE_OPENAI_KEY="YOUR OPEN AI API KEY"
- AZURE_OPENAI_ENDPOINT="YOUR OPEN AI ENDPOINT"

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

- AZURE_OPENAI_ENDPOINT: The endpoint URL for the OpenAI API.
- AZURE_OPENAI_KEY: The API key for accessing the OpenAI API.

### .env Example

```js
AZURE_OPENAI_KEY = "AZURE_OPENAI_KEY";
AZURE_OPENAI_ENDPOINT = "AZURE_OPEN_AI_ENDPOINT";
```

## APIs

1. ### azureOpenAIClient
   > ./src/azureOpenAIClient

This module provides a client for accessing the OpenAI API using the configuration specified in the .env file. It also includes an enum for the model names used in the OpenAI API.

1. Use the openAIClient instance to access the OpenAI API methods.
2. Access the provided enum DEPLOYMENTS to get the names of the available models.

#### Usage:

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const createCompletion = async (history) => {
  return openAIClient.getChatCompletions(DEPLOYMENTS.COMPLETION, history);
};
```

OR

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const createEmbeddings = async (input) => {
  return openAIClient.getEmbeddings(DEPLOYMENTS.EMBEDDING, input);
};
```

## Examples

### 1. Create Completion

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const createCompletion = async (history) => {
  return openAIClient.getChatCompletions(DEPLOYMENTS.COMPLETION, history);
};
async function main() {
  // Create a chat history
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
  ];

  // New user query
  const newUserPrompt = {
    role: "user",
    content: "Do other Azure Cognitive Services support this too",
  };
  // Push the new question to the chat
  history.push(newUserPrompt);

  // Send the chat to the model
  const result = await createCompletion(history);

  // Print the answers
  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

> You can find a complete code snippet in the ./src/ChatCompletion.js module.

### 2. Create Embeddings

```js
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");
const createEmbeddings = async (input) => {
  return openAIClient.getEmbeddings(DEPLOYMENTS.EMBEDDING, input);
};
const main = async () => {
  return createEmbeddings(`
  1. Encapsulation: It refers to the concept of data hiding that restricts data access and manipulation to within the object. This ensures that data is accessed and modified only by authorized operations.

  2. Inheritance: It refers to the ability of a class to inherit properties and methods from its parent class. This mechanism enables code reuse and promotes the concept of hierarchy.
  
  3. Polymorphism: It refers to the ability of an object to take on different forms or behaviors. In OOP, it means that a single method can be used with different data types.
  `);
};

main()
  .then((response) => console.log(response.data))
  .catch((error) => {
    console.error("The sample encountered an error:", error);
  });
```

> You can find a complete code snippet in the ./src/TextEmbedding.js module.

### ChatBot App

For an interactive chatbot working application please refer to the CompletionChatBot.js module.
Run the below command to try the chatbot.

```sh
node ./src/CompletionChatBot.js
```
