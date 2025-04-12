import { Loader2, Trash2 } from "lucide-react";
// import { TInterview } from "../types";
import Heading from "./Heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import axiosInstance from "../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

// interface TMockInterViewProps {
//   interview: TInterview | null;
// }

interface TFormData {
  user: string;
  title: string;
  description: string;
  experience: number;
  techStack: string;
}

const FormMockInterview = () => {
  const userId = useSelector((state: RootState) => state.auth._id);
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);

  const [formData, setFormData] = useState<TFormData>({
    user: userId,
    title: "",
    description: "",
    experience: 0,
    techStack: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    axiosInstance
      .post("/generate", formData, {
        headers: {
          withCredentials: true,
        },
      })
      .then((data) => {
        isLoading(false);
        console.log(data)
        navigate("/generate", { replace: true });
      })
      .catch(() => {});
  };
  return (
    <div className="flex-col w-full space-y-4">
      <div className="flex justify-between items-center mt-4 w-full">
        <Heading title="Create A New Interview" isSubheading />
        <Button size={"icon"} variant={"ghost"}>
          <Trash2 className="min-w-4 min-h-4 text-red-500" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="my-6"></div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md"
      >
        {/* job role */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Job Role / Job Position</Label>
          <Input
            name="title"
            onChange={handleInputChange}
            value={formData.title}
            type="text"
            placeholder="Ex - Full Stack Developer"
          />
        </div>
        {/* job description */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Job Description</Label>
          <Textarea
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            placeholder="Give Proper Job Description"
          />
        </div>
        {/* experience */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Years of Experience</Label>
          <Input
            type="number"
            name="experience"
            onChange={handleInputChange}
            value={formData.experience}
            placeholder="Ex - 5 Years in Number"
          />
        </div>
        {/* tech stack */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Tech Stack</Label>
          <Textarea
            name="techStack"
            onChange={handleInputChange}
            value={formData.techStack}
            placeholder="Ex - 'Node JS' 'React JS'"
          />
        </div>
        <div className="flex justify-end w-full">
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="max-w-sm">
              Create
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormMockInterview;
