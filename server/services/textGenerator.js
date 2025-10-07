const { checkText } = require("../services/textChecker");

async function generateText(description) {
    try {
        if (!description) return false;

        const rawResponse = await checkText(description);

        // Try to extract JSON from markdown fences
        const jsonMatch = rawResponse && rawResponse.match
            ? rawResponse.match(/```json\s*([\s\S]*?)\s*```/)
            : null;
        const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
        if (process.env.DEBUG_GEMINI === "true") {
            console.log(jsonString);
        }

        let parsedPlan;
        try {
            parsedPlan = JSON.parse(jsonString);
        } catch (err) {
            console.error("Error parsing JSON response:", err);
            return false; // Return false on JSON parsing error
        }

        return (
            parsedPlan &&
            typeof parsedPlan.Answer === "string" &&
            parsedPlan.Answer.toLowerCase() === "yes"
        );
    } catch (err) {
        console.error("Error in generateText:", err);
        return false; // Return false on internal error
    }
}

module.exports = { generateText };