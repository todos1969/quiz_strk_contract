import React from "react";
import Header from "@/components/Header/Header";
import Myquiz from "@/components/MyQuizzes/MyQuiz";

import { getMyQuizzes } from "@/requests/useQuiz";

const MyQuizzes = () => {
  const { data, mutateMyQuiz, isLoading } = getMyQuizzes();

  return (
    <div>
      <Header mutateMyQuiz={mutateMyQuiz} />
      <Myquiz data={data} isLoading={isLoading} mutateQuiz={mutateMyQuiz} />
    </div>
  );
};

export default MyQuizzes;
