// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { TInterview } from "../types";

import FormMockInterview from "../components/FormMockInterview";

const CreateEditPage = () => {
  //   const { interviewId } = useParams<{ interviewId: string }>();
  //   const [interview, setInterview] = useState<TInterview | null>(null);
  return (
    <div>
      <FormMockInterview />
    </div>
  );
};

export default CreateEditPage;
