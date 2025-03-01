import { Sparkle } from "lucide-react";
import Container from "../components/Container";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="flex-col w-full pb-24">
      <Container className="flex flex-col items-center">
        <div className="my-8">
          <h2 className="text-4xl text-center md:text-left md:text-6xl">
            <span className="text-outline font-extrabold md:text-8xl">
              AI SUPERPOWER
            </span>
            <span className="text-gray-500 font-extrabold">
              - A better way to
            </span>
            <br />
            improve your interview skills
          </h2>
          <p className="mt-4 text-muted-foreground text-sm">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice to
            stand out.
          </p>
        </div>
        <Button>
          <Link to={"/generate"} className="flex justify-between items-center gap-2">
            Take An Interview <Sparkle />
          </Link>
        </Button>
      </Container>
    </div>
  );
};

export default Homepage;
