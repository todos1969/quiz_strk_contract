import React from "react";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Allquizz from "@/components/Allquizz/Allquizz";
import { getAllQuiz } from "@/requests/useQuiz";

export default function Home() {
  const { data, error, mutateQuiz, isLoading } = getAllQuiz();
  const { mutateMyQuiz } = getAllQuiz();

  return (
    <>
      <Head>
        <title>Starknet Quiz</title>
        <meta name="description" content="A simple starknet quiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/starknetLogo.svg" />
      </Head>
      <Header mutateQuiz={mutateQuiz} mutateMyQuiz={mutateMyQuiz} />
      <Allquizz
        data={data}
        isLoading={isLoading}
        error={error}
        mutateQuiz={mutateQuiz}
      />
    </>
  );
}
