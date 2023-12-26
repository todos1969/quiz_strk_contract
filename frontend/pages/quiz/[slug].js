import React from "react";

import Header from "@/components/Header/Header";
import Quiz from "@/components/Quiz/Quiz";

import { useRouter } from "next/router";

const quizPage = () => {
  const router = useRouter();

  return (
    <div>
      <Header />
      {router.query.slug && <Quiz id={router.query.slug} />}
    </div>
  );
};

export default quizPage;
