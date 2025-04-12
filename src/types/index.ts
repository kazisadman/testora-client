export interface TInterview {
  _id: string;
  title: string;
  description: string;
  userId: string;
  techStack: string;
  questions: {
    question: string;
    answer: string;
  }[];
  experience: number;
}

export interface TInterviewPin {
  interviews: {
    _id: string;
    title: string;
    description: string;
    userId: string;
    techStack: string;
    questions: {
      question: string;
      answer: string;
    }[];
    experience: number;
  };
}
