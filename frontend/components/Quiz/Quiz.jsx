import React, { useEffect, useState } from "react";

import Container from "@mui/system/Container";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Button from "@mui/material/Button";
import { shortString, stark } from "starknet";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Loader from "@/utils/Loader";
import { getQuiz } from "@/requests/useQuiz";

import styles from "./quiz.module.css";
import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";

function splitString(text) {
  const feltArray = [];
  for (let i = 0; i < text.length; i += 31) {
    feltArray.push(shortString.encodeShortString(text.slice(i, i + 31)));
  }
  return feltArray;
}

const Quiz = ({ id }) => {
  const router = useRouter();
  const { data, isLoading } = getQuiz(id);
  const [checked, setChecked] = useState(-1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [finish, setFinish] = useState(false);
  const [score, setScore] = useState(0);
  const [victory, setVictory] = useState(false);
  const [minted, setMinted] = useState(false);
  const { account } = useAccount();

  useEffect(() => {
    if (minted) {
      router.push("/");
    }
  }, [minted]);

  const nextQuestion = (correctAnswerId) => {
    if (checked === -1) {
      setError("Pick an answer");
      setOpenError(true);
      return;
    }
    if (data?.questions?.length === questionIndex + 1) {
      setFinish(true);
    }
    if (data?.questions?.length === score + 1) {
      setVictory(true);
    }
    if (checked === correctAnswerId) {
      setSuccess("Congrats, your answer is correct !");
      setOpen(true);
      setScore(score + 1);
    } else {
      setError("Wrong answer...");
      setOpenError(true);
    }
    setQuestionIndex(questionIndex + 1);
    setChecked(-1);
  };

  const mintQuiz = async () => {
    try {
      const callTx = await account.execute({
        contractAddress: process.env.CONTRACT_ADDRESS,
        entrypoint: "mint",
        calldata: stark.compileCalldata({
          base_token_uri: splitString(data?.ipfsJson),
        }),
      });
      const status = await account.waitForTransaction(callTx.transaction_hash);
      console.log(status);
      if (status.status === "PENDING") {
        setMinted(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      {isLoading && (
        <div style={{ marginTop: "25px" }}>
          <Loader />
        </div>
      )}
      {data && !isLoading && (
        <>
          <Typography
            variant="h2"
            style={{ marginTop: "25px", textAlign: "center" }}
          >
            {data.title}
          </Typography>
          <div className={styles.quizContainer}>
            {finish && (
              <div>
                <Typography variant="h2" textAlign={"center"}>
                  Your score is {score + "/" + data?.questions?.length}
                </Typography>
                {victory && (
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => mintQuiz()}
                      style={{ marginTop: "15px" }}
                    >
                      Mint the quiz NFT
                    </Button>
                  </div>
                )}
              </div>
            )}
            {data?.questions
              ?.slice(questionIndex, questionIndex + 1)
              .map((question, index) => {
                return (
                  <div key={index}>
                    {!finish && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" style={{ color: "gray" }}>
                            Quiz
                          </Typography>
                          <Typography variant="body2" style={{ color: "gray" }}>
                            {questionIndex + 1 + "/" + data?.questions?.length}
                          </Typography>
                        </div>
                        <Typography variant="h5" style={{ margin: "25px 0px" }}>
                          {question.question}
                        </Typography>
                        <FormGroup
                          style={{
                            width: "100%",
                          }}
                        >
                          {question?.answers?.map((answer, index) => {
                            return (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<RadioButtonCheckedIcon />}
                                    checked={checked === index}
                                  />
                                }
                                key={index}
                                label={answer}
                                onClick={() => setChecked(index)}
                                className={styles.questionContainer}
                              />
                            );
                          })}
                        </FormGroup>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() =>
                              nextQuestion(question.correctAnswerId)
                            }
                            style={{ marginTop: "15px" }}
                          >
                            Next Question
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Quiz;
