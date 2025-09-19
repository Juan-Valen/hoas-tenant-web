const model = require("../config/gemini"); 

async function checkText(description) {
  const prompt = `
    You are evaluating a users professional language. Review if the user input is appropriate for all audiences and generate a **structured answer** in **JSON format**.

    ### Schema Requirements:
    The JSON response should have the following structure:

    {
      "Answer": "yes or no"
    }

    ### User Input:
    ${description}

    ### Instructions:
    - Answer only yes or no.
    - Do not include extra fields outside of the schema.
    - Return only valid JSON.
  `;

  try {
    const result = await model(prompt);

    if (process.env.DEBUG_GEMINI === "true") {
      console.log("🔍 Raw Gemini response:", result);
    }

    return result.text;
  } catch (err) {
    console.error("Error in textChecker:", err);
    throw new Error("Failed to generate answer");
  }
}

module.exports = { checkText };
// If you want to ask the LLM for more complicated structured output, check the commented code below for an advanced example.