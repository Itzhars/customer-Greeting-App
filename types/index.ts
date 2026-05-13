export interface GreetingTemplate {
  id: string;
  name: string;
  category: string;
  thumbnailUrl: string;
  premium: boolean;
  textPosition: "top" | "center" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  profilePosition: "top-right" | "bottom-right" | "top-left" | "bottom-left" | "center-bottom" | "none";
}

export interface UserInput {
  senderName: string;
  recipientName: string;
  message: string;
}
