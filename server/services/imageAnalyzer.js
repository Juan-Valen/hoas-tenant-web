const model = require("../config/gemini");

/**
 * Analyzes multiple images for appropriateness and relevance to market listings
 * @param {Array<{buffer: Buffer, mimeType: string, filename: string}>} imageFiles - Array of image objects
 * @returns {Object} Analysis result with approval status and per-image details
 */
async function analyzeMarketImages(imageFiles) {
  // Ensure imageFiles is always an array
  const imageArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];
  
  // Convert all images to base64
  const imageData = imageArray.map((imageFile, index) => ({
    mimeType: imageFile.mimeType,
    base64Data: imageFile.buffer.toString('base64'),
    filename: imageFile.filename || `image_${index + 1}`,
    originalIndex: index
  }));
  
  const prompt = `
    You are analyzing ${imageArray.length} image(s) for a marketplace listing to ensure they're appropriate and relevant.
    You are then providing a brief description of the items.
    
    Evaluate ALL images based on these criteria:
    1. **Content Appropriateness**: No inappropriate, offensive, or explicit content
    2. **Relevance**: Images should be relevant to a secondhand marketplace item and show related items
    3. **Quality**: Images should be clear enough to show the item(s)
    4. **Safety**: No dangerous or illegal items
    
    Analyze each image individually and provide an overall assessment.

    Provide a brief 1 to 3 paragraph description of the items shown in the images.
    
    Provide a structured JSON response:
    
    {
      "overallApproved": true/false,
      "imagesDescription": "brief description of the items"
      }
  `;

  try {
    const result = await model(prompt, imageData);

    // Parse the JSON response
    const responseText = result.text;
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1] : responseText;
    
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Error in multiple image analysis:", err);
    throw new Error("Failed to analyze multiple images");
  }
}

module.exports = { 
  analyzeMarketImages
};