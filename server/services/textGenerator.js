const { checkText } = require("../services/textChecker")

async function generateText(description) {
    try {
        if (description !== "") {
            const rawResponse = await checkText(description);

            // Try to extract JSON from markdown fences
            const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/);
            const jsonString = jsonMatch ? jsonMatch[1] : rawResponse;
            if (process.env.DEBUG_GEMINI === "true") {
                console.log(jsonString);
            }

            let parsedPlan;
            try {
                parsedPlan = JSON.parse(jsonString);
            } catch (err) {
                return res.status(500).json({ error: "Error parsing JSON response." });
            }

            if (parsedPlan.Answer == "yes") {
                return true
            }
            return false
        }
    } catch (err) {
        console.error("Error in fitnessController:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }

}

module.exports = { generateText };