import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

import { useRouter } from "next/router";

import styles from "./allQuizz.module.css";

const DisplayQuizzes = ({ allQuizz }) => {
  const router = useRouter();

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "25px", paddingBottom: "50px" }}
    >
      {allQuizz?.map((quiz, index) => {
        return (
          <div className={styles.quizContainer} key={index}>
            <Typography
              variant="h2"
              style={{ fontSize: "35px", fontWeight: "bold" }}
            >
              {quiz.title}
            </Typography>
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              {quiz.description}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#28a428", fontWeight: "bold" }}
                onClick={() => {
                  router
                    .replace("/quiz/" + quiz._id)
                    .then(() => router.reload());
                }}
              >
                <RocketLaunchIcon style={{ marginRight: "5px" }} />
                Launch Quiz
              </Button>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default DisplayQuizzes;
