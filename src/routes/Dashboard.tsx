import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../components/ui/separator";

const Dashboard = () => {
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
      <Separator className="my-8"/>
    </>
  );
};

export default Dashboard;
