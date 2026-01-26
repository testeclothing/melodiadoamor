export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SongSample {
  id: number;
  title: string;
  genre: string;
  url: string; // URL to an mp3 file
}

export interface FormData {
  recipient: string;
  genre: string;
  mood: string;
  vocal: string;
  occasion: string;
  storyMeet: string;
  storyMemory: string;
  storyLove: string;
  extraPhrase: string;
  includeVideo: boolean;
  email: string;
}