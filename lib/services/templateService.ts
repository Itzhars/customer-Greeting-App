import { db } from "../firebase";
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { GreetingTemplate } from "@/types";
import { templates as staticTemplates } from "@/data/templates";

const COLLECTION_NAME = "templates";

export const templateService = {
  /**
   * Fetches all templates from Firestore
   */
  async getAllTemplates(): Promise<GreetingTemplate[]> {
    try {
      const templatesCol = collection(db, COLLECTION_NAME);
      const templateSnapshot = await getDocs(templatesCol);
      const templateList = templateSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as GreetingTemplate[];
      
      return templateList;
    } catch (error) {
      console.error("Error fetching templates:", error);
      // Fallback to static data if Firestore fails
      return staticTemplates;
    }
  },

  /**
   * Fetches a single template by ID
   */
  async getTemplateById(id: string): Promise<GreetingTemplate | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { ...docSnap.data(), id: docSnap.id } as GreetingTemplate;
      }
      return null;
    } catch (error) {
      console.error("Error fetching template:", error);
      return staticTemplates.find(t => t.id === id) || null;
    }
  },

  /**
   * Seeds the Firestore collection with initial data from static file
   * This is a utility function to be called once or in development
   */
  async seedTemplates() {
    try {
      const templatesCol = collection(db, COLLECTION_NAME);
      
      for (const template of staticTemplates) {
        const docRef = doc(templatesCol, template.id);
        await setDoc(docRef, template, { merge: true });
      }
      
      console.log("Templates successfully seeded to Firestore!");
      return true;
    } catch (error) {
      console.error("Error seeding templates:", error);
      return false;
    }
  }
};
