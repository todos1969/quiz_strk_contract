import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./MyQuizz.module.css";

import { deleteQuiz } from "@/requests/useQuiz";

const DisplayQuizzes = ({ allQuizz, mutateQuiz }) => {
  const quizDelete = async (id) => {
    await deleteQuiz(id);
    mutateQuiz();
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "25px" }}>
      {allQuizz.map((quiz, index) => {
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
                style={{
                  backgroundColor: "red",
                  fontWeight: "bold",
                }}
                onClick={() => quizDelete(quiz._id)}
              >
                <DeleteIcon style={{ marginRight: "5px" }} />
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

export default DisplayQuizzes;
