import { CircleCheck, Star } from "lucide-react";
import Modal from "./Modal";
import { Card, CardDescription, CardTitle } from "./ui/card";

interface TFeedbackModal {
  isOpen: boolean;
  onClose: () => void;
  rating: number | undefined;
  correctAnswer: string;
  userAnswer: string;
  feedback: string | undefined;
  //   onConfirm: () => void;
  //   loading: boolean;
}

const FeedbackModal = ({
  isOpen,
  onClose,
  //   onConfirm,
  //   loading,
  rating,
  correctAnswer,
  userAnswer,
  feedback,
}: TFeedbackModal) => {
  return (
    <Modal
      title="Your Feedback!"
      description="Disclaimer:Your Feedback will lost if you change question.Please Read carefully!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="text-lg font-semibold to-gray-700">
        <Star className="inline mr-2 text-yellow-400" />
        Rating:{rating}
      </div>
      <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
        <CardTitle className="flex items-center">
          <CircleCheck className="mr-2 text-green-600" />
          Expected Answer
        </CardTitle>

        <CardDescription className="font-medium text-gray-700">
          {correctAnswer}
        </CardDescription>
      </Card>
      <Card className="border-none space-y-3 p-4 bg-blue-50 rounded-lg shadow-md ">
        <CardTitle className="flex items-center">
          <CircleCheck className="mr-2 text-blue-600" />
          Your Answer
        </CardTitle>

        <CardDescription className="font-medium text-gray-700">
          {userAnswer}
        </CardDescription>
      </Card>
      <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
        <CardTitle className="flex items-center">
          <CircleCheck className="mr-2 text-red-600" />
          Feedback
        </CardTitle>

        <CardDescription className="font-medium text-gray-700">
          {feedback}
        </CardDescription>
      </Card>
    </Modal>
  );
};

export default FeedbackModal;
