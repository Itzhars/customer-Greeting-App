import { storage } from "../firebase";
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

export const storageService = {
  /**
   * Uploads a Blob (generated image) to Firebase Storage
   * @param blob The image blob to upload
   * @param path The path in storage (e.g., 'greetings/my-card.png')
   */
  async uploadGreeting(blob: Blob, fileName: string): Promise<string> {
    try {
      const storageRef = ref(storage, `greetings/${fileName}-${Date.now()}.png`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error("Error uploading to storage:", error);
      throw error;
    }
  }
};
