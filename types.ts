export interface SongSample {
  id: number;
  title: string;
  genre: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
