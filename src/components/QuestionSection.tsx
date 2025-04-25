import { useState } from "react";
import { cn } from "../lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Volume2, VolumeX } from "lucide-react";
import TooltipButton from "./TooltipButton";
import RecordAnswer from "./RecordAnswer";

interface TQuestions {
  questions: {
    question: string;
    answer: string;
  }[];
}

const QuestionSection = ({ questions }: TQuestions) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full min-h-96 border-md p-4">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-12 border-2 p-1 rounded-lg"
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
            <div className="flex justify-end w-full">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"}
                icon={
                  isPlaying ? (
                    <VolumeX className="min-w-5 min-h-5" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5" />
                  )
                }
                onclick={() => handlePlayQuestion(question.question)}
              />
            </div>
            <RecordAnswer
              question={question}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default QuestionSection;
