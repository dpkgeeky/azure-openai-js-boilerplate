const readlineSync = require("readline-sync");
const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");

// Start the chat
(async () => {
  // Save the chat history to be sent in each new request.
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "system",
      content:
        " User can exit the program anytime by typing any of these options 'q', 'exit' , 'quit'. ",
    },
  ];
  console.log(
    "Note: To exit the chat, you can type 'q', 'exit', or 'quit' at any time and the program will stop running."
  );
  // Keep it running ..
  while (true) {
    const userInput = readlineSync.question("Your input: ");
    // Check if the user want to terminate the session
    if (
      ["Q", "QUIT", "EXIT", "EXIT()", "QUITE()"].includes(
        userInput.toUpperCase()
      )
    ) {
      console.log("Bye!");
      return;
    }
    // Add the user prompt to the chat history
    messages.push({ role: "user", content: userInput });

    // Send API to the model to get the response
    try {
      const completion = await openAIClient.getChatCompletions(
        DEPLOYMENTS.COMPLETION,
        messages
      );
      // Print the response
      for (const choice of completion.choices) {
        console.log(choice.message.content);
        messages.push({
          role: "assistant",
          content: choice.message.content,
        });
      }
    } catch (error) {
      // Handle Errors
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
      return;
    }
  }
})();
