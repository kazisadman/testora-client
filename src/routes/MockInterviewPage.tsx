import { Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TInterview } from "../types";
import axiosInstance from "../lib/axiosInstance";
import QuestionSection from "../components/QuestionSection";

const MockInterviewPage = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState<TInterview | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/generate/${interviewId}`, {
        headers: {
          withCredentials: true,
        },
      })
      .then((data) => {
        setInterview(data?.data.data);
      })
      .catch(() => {});
  }, [interviewId]);
  return (
    <div>
      <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-3 my-2">
        <Lightbulb className="h-5 w-5 text-sky-600" />
        <div>
          <AlertTitle className="text-sky-800 font-semibold">
            Important Note
          </AlertTitle>
          <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
            Press "Record Answer" to begin answering the question. Once you
            finish the interview, you&apos;ll receive feedback comparing your
            responses with the ideal answers.
            <br />
            <br />
            <strong>Note:</strong>{" "}
            <span className="font-medium">Your video is never recorded.</span>
            You can disable the webcam anytime if preferred.
          </AlertDescription>
        </div>
      </Alert>
      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;
