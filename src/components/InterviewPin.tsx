import { TInterview } from "../types";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkle } from "lucide-react";
import { Link } from "react-router-dom";

interface TInterviewPin {
  data: TInterview;
  onMockLoadPage: boolean;
}

const InterviewPin = ({ data, onMockLoadPage }: TInterviewPin) => {
  const { title, description, techStack, _id } = data;
  return (
    <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 cursor-pointer transition-all space-y-4">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="w-full flex items-center gap-2 flex-wrap mb-3">
        {techStack?.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {word}
          </Badge>
        ))}
      </div>
      {!onMockLoadPage && (
        <Link to={`/generate/interview/${_id}`}>
          <Button variant="outline" className="mt-4">
            <Sparkle /> Start
          </Button>
        </Link>
      )}
    </Card>
  );
};

export default InterviewPin;
