import { cn } from "../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TQuestions {
  questions: {
    question: string;
    answer: string;
  }[];
}

const QuestionSection = ({ questions }: TQuestions) => {
  return (
    <div className="w-full min-h-96 border-md p-4">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-12"
        orientation="vertical"
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
          {questions?.map((question, index) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2"
              )}
              key={question.question}
              value={question.question}
            >{`Question #${index + 1}`}</TabsTrigger>
          ))}
        </TabsList>
        {questions?.map((question, index) => (
          <TabsContent key={index} value={question.question}>
            <p className="text-base text-left tracking-wide text-neutral-500">
              {question.question}
            </p>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionSection;
