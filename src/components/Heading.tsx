import { cn } from "../lib/utils";

interface THeading {
  title: string;
  description?: string;
  isSubheading?: boolean;
}

const Heading = ({ title, description, isSubheading }: THeading) => {
  return (
    <div>
      <h2
        className={cn(
          "text-2xl md:text-3xl text-gray-800 font-semibold",
          isSubheading && "text-lg md:text-xl"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default Heading;
