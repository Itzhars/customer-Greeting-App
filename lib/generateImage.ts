import html2canvas from "html2canvas";

/**
 * Captures a DOM element and downloads it as a high-quality PNG image.
 * 
 * @param elementId The ID of the HTML element to capture.
 * @param fileName The desired name for the downloaded file.
 */
export async function downloadGreetingImage(elementId: string, fileName: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found.`);
  }

  try {
    // Wait for all images within the element to load
    const images = Array.from(element.getElementsByTagName("img"));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    );

    // High-quality capture settings
    const canvas = await html2canvas(element, {
      scale: 3, // 3x scale for "Retina" quality
      useCORS: true, // Allow cross-origin images (important for Firebase/S3 avatars)
      allowTaint: true,
      backgroundColor: null, // Preserve transparency if any
      logging: false,
      onclone: (clonedDoc) => {
        // Optional: Perform any specific styling for the cloned element before capture
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.style.borderRadius = "0"; // Remove rounded corners for a full card export if desired
        }
      },
    });

    // Convert canvas to Data URL
    const dataUrl = canvas.toDataURL("image/png", 1.0);

    // Create a virtual link and trigger download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate and download image.");
  }
}

/**
 * Captures a DOM element and returns it as a File object.
 */
export async function captureGreetingAsFile(elementId: string, fileName: string): Promise<File> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found.`);
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create image blob"));
          return;
        }
        const file = new File([blob], `${fileName}.png`, { type: "image/png" });
        resolve(file);
      }, "image/png", 1.0);
    });
  } catch (error) {
    console.error("Error capturing file:", error);
    throw new Error("Failed to capture image for sharing.");
  }
}
