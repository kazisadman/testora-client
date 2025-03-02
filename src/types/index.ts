export interface TInterview {
  id: string;
  position: string;
  description: string;
  userId: string;
  techStack: string;
  questions: {
    question: string;
    answer: string;
  }[];
  experienc: number;
}
