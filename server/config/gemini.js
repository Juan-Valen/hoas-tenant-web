const { GoogleGenAI } = require('@google/genai')

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY)

// GoogleGenerativeAI setup
const MODEL_NAME = "gemini-2.0-flash";

const model = async (prompt, imageData = null) => {
  const contents = [{
    role: "user",
    parts: []
  }];

  // Always add the text prompt
  contents[0].parts.push({
    text: prompt
  });

  // Handle single image or multiple images
  if (imageData) {
    if (Array.isArray(imageData)) {
      // Multiple images
      imageData.forEach(image => {
        contents[0].parts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.base64Data
          }
        });
      });
    } else {
      // Single image (backward compatibility)
      contents[0].parts.push({
        inlineData: {
          mimeType: imageData.mimeType,
          data: imageData.base64Data
        }
      });
    }
  }

  try {
    const response = await genAI.models.generateContent({
      model: MODEL_NAME,
      contents: contents
    });

    return response;
  } catch (err) {
    console.error("❌ Gemini API error:", err.message);
    throw err;
  }
};

module.exports = model;