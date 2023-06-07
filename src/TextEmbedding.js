const { openAIClient, DEPLOYMENTS } = require("./azureOpenAIClient");

// Import this function and use it as shown below
const createEmbeddings = async (input) => {
  return openAIClient.getEmbeddings(DEPLOYMENTS.EMBEDDING, input);
};

// Usage Example
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

exports.createEmbeddings = createEmbeddings;
