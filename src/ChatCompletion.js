const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");

// Import this function and use it as shown below
const createCompletion = async (history) => {
  return openAIClient.getChatCompletions(DEPLOYMENTS.COMPLETION, history);
};

// Usage Example
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

exports.createCompletion = createCompletion;
