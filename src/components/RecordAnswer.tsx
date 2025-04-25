import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import {
  Loader,
  MessageSquareCode,
  Mic,
  MicOff,
  RefreshCw,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import TooltipButton from "./TooltipButton";
import { toast, Toaster } from "sonner";
import axiosInstance from "../lib/axiosInstance";
import FeedbackModal from "./FeedbackModal";

interface TRecordAnswer {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface TAIResponse {
  ratings: number;
  feedback: string;
}

const RecordAnswer = ({ question, isWebCam, setIsWebCam }: TRecordAnswer) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<TAIResponse | null>(null);
  const [open, setOpen] = useState(false);

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 30) {
        toast.error("Your answer should be more than 30 Characters");
        return;
      }

      const payload = {
        question: question.question,
        answer: question.answer,
        userAnswer,
      };

      try {
        setIsAiGenerating(true);
        axiosInstance.post("/generate/feedback", payload).then((data) => {
          setIsAiGenerating(false);
          setAiResult(data.data?.data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      startSpeechToText();
    }
  };

  useEffect(() => {
    const combinedTranscripts = results
      .filter((result) => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combinedTranscripts);
  }, [results]);

  const recordNewAnswer = () => {
    results.length = 0;
    recordUserAnswer();
  };

  return (
    <div className="w-full flex flex-col items-center gap8 mt-4">
      <FeedbackModal
        isOpen={open}
        onClose={() => setOpen(false)}
        rating={aiResult?.ratings}
        userAnswer={userAnswer}
        correctAnswer={question.answer}
        feedback={aiResult?.feedback}
      />
      ;
      <Toaster richColors />
      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
        {isWebCam ? (
          <Webcam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
          />
        ) : (
          <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
        )}
      </div>
      <div>
        <TooltipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onclick={() => setIsWebCam(!isWebCam)}
        />
        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <MicOff className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onclick={recordUserAnswer}
        />
        <TooltipButton
          content="Record New Answer"
          icon={<RefreshCw className="min-w-5 min-h-5" />}
          onclick={recordNewAnswer}
        />
        <TooltipButton
          content="Show Feedback"
          icon={
            isAiGenerating ? (
              <Loader className="min-w-5 min-h-5" />
            ) : (
              <MessageSquareCode className="min-w-5 min-h-5" />
            )
          }
          onclick={() => setOpen(!open)}
          disabled={!aiResult}
        />
      </div>
      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold">Your Answer: </h2>
        <p className="text-sm mt-2 text-gray-700 whitespace-normal">
          {userAnswer || "Start recording to see your answer here"}
        </p>
        {interimResult && (
          <p className="text-sm text-gray-500 mt-2">
            <strong>Current Speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordAnswer;
