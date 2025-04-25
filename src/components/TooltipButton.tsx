import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ButtonVariant =
  | "ghost"
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | null
  | undefined;

interface TTooltipButton {
  content: string;
  icon: React.ReactNode;
  onclick: () => void;
  buttonVarient?: ButtonVariant;
  buttonClassName?: string;
  delay?: number;
  disabled?: boolean;
  loading?: boolean;
}

const TooltipButton = ({
  content,
  icon,
  onclick,
  buttonVarient = "ghost",
  buttonClassName = "",
  delay = 0,
  disabled = false,
  loading = false,
}: TTooltipButton) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger
          className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
        >
        </TooltipTrigger>

        <Button
          size={"icon"}
          disabled={disabled}
          variant={buttonVarient}
          className={buttonClassName}
          onClick={onclick}
        >
          {loading ? (
            <Loader className="min-w-4 min-h-4 animate-spin text-emerald-400" />
          ) : (
            icon
          )}
        </Button>
        <TooltipContent>
          <p>{loading ? "Loading..." : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipButton;
