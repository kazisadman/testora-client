import { Lightbulb, Sparkle, WebcamIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useParams } from "react-router-dom";
import { TInterview } from "../types";
import InterviewPin from "../components/InterviewPin";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import WebCam from "react-webcam";

const MockLoadPage = () => {
  const { interviewId } = useParams();
  const [interview, setInterview] = useState<TInterview | null>(null);
  const [isWebCamEnable, setIsWebCamEnable] = useState(false);

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
      <div className="flex justify-end w-full my-3">
        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button>
            Start <Sparkle />
          </Button>
        </Link>
      </div>
      {interview && <InterviewPin data={interview} onMockLoadPage={true} />}
      <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg flex items-start gap-3 mt-3">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <div>
          <AlertTitle className="text-yellow-800 font-semibold">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You’ll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>
      <div className="flex items-center justify-center w-full h-full my-4">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCamEnable ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnable(true)}
              onUserMediaError={() => setIsWebCamEnable(false)}
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex items-center justify-center mb-2">
        <Button onClick={() => setIsWebCamEnable(!isWebCamEnable)}>
          {isWebCamEnable ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};

export default MockLoadPage;
