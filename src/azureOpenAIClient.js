const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
require("dotenv").config();
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
const azureApiKey = process.env["AZURE_OPENAI_KEY"];
const DEPLOYMENTS = {
  COMPLETION: "gpt-35-turbo-base",
  EMBEDDING: "text-embedding-ada-002",
};

// Create an instance of the OpenAIClient
const openAIClient = new OpenAIClient(
  endpoint,
  new AzureKeyCredential(azureApiKey)
);

// Export the created instance and the deployment ID
exports.openAIClient = openAIClient;
exports.DEPLOYMENTS = DEPLOYMENTS;
