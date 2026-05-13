/**
 * Utility for sharing greeting cards across various platforms.
 */
export async function shareGreeting(file: File, title: string, text: string): Promise<void> {
  // 1. Check if Native Web Share is available and supports files
  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: title,
        text: text,
      });
      return;
    } catch (error) {
      // User cancelled or share failed
      if ((error as Error).name !== "AbortError") {
        console.error("Native share failed:", error);
      } else {
        return; // Silent exit if user cancelled
      }
    }
  }

  // 2. Fallback for Desktop or unsupported browsers
  // We can't share a File object directly to WhatsApp/Email via URL schemes on desktop easily.
  // The best UX is to notify the user to download first.
  throw new Error("Native sharing not supported on this device. Please download the image and share it manually.");
}

/**
 * Generates a WhatsApp share URL (Text only fallback)
 */
export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Generates an Email share URL
 */
export function getEmailShareUrl(subject: string, body: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
