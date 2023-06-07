const readlineSync = require("readline-sync");
const {
  openAiClient: openAiClient,
  DEPLOYMENTS,
} = require("./azureOpenAIClient");

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
  // .
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
      const completion = await openAiClient.getChatCompletions(
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
      // Add the response to the chat history

      // // Terminate the session if needed
      // const userInput_again = readlineSync.question(
      //   "\nWould you like to continue the conversation? (Y/N)"
      // );
      // if (userInput_again.toUpperCase() === "N") {
      //   return;
      // } else if (userInput_again.toUpperCase() !== "Y") {
      //   console.log(
      //     "Invalid input. Please enter 'exit' or 'q' or 'quit' to exit."
      //   );
      // }
    } catch (error) {
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
