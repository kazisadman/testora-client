import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { useEffect, useState } from "react";
import { TInterviewPin } from "../types";
import axiosInstance from "../lib/axiosInstance";
import InterviewPin from "../components/InterviewPin";

const Dashboard = () => {
  const [interviews, setInterviews] = useState<TInterviewPin[] | null>(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/interviews", {
        headers: {
          withCredentials: true,
        },
      })
      .then((data) => {
        isLoading(false);
        setInterviews(data.data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <div className="flex justify-between items-center pt-4">
        {/* Heading */}
        <Heading
          title="Dashboard"
          description="Create and start your mock Interview"
        />

        {/* Button */}
        <Link to={"/generate/create"}>
          <Button>
            <Plus />
            Add New
          </Button>
        </Link>
      </div>
      <Separator className="my-8" />
      <div className="md:grid md:grid-cols-3 gap-3 py-4">
        {!loading &&
          interviews?.map((item, index) => (
            <InterviewPin
              key={index}
              data={item.interviews}
              onMockLoadPage={false}
            />
          ))}
      </div>
    </>
  );
};

export default Dashboard;
