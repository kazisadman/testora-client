import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface TContainer {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: TContainer) => {
  return (
    <div
      className={cn("container mx-auto px-4 md:px-8 py-4 w-full", className)}
    >
      {children}
    </div>
  );
};

export default Container;
