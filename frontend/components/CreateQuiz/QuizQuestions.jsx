import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import HelpIcon from "@mui/icons-material/Help";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

import styles from "./createQuizz.module.css";

const questionTemplate = {
  question: "",
  answers: ["", ""],
  correctAnswerId: 0,
};

const QuizQuestions = ({ questions, setQuestions }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleClose = () => setOpen(false);

  const addQuestion = () => {
    const newQuestions = questions;

    newQuestions.push(questionTemplate);
    setQuestions([...newQuestions]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions;

    if (newQuestions.length > 1) {
      newQuestions.splice(index, 1);
      setQuestions([...newQuestions]);
    } else {
      setError("A minimum of 1 question is required");
      setOpen(true);
    }
  };

  const addAnswer = (index) => {
    const newQuestions = questions;

    if (newQuestions[index].answers.length < 5) {
      newQuestions[index].answers.push("");

      setQuestions([...newQuestions]);
    } else {
      setError("Maximum 5 answers");
      setOpen(true);
    }
  };

  const removeAnswer = (index) => {
    const newQuestions = questions;

    if (newQuestions[index].answers.length > 2) {
      newQuestions[index].answers.splice(
        newQuestions[index].answers.length - 1,
        1
      );
      setQuestions([...newQuestions]);
    } else {
      setError("A minimum of 2 answers are required");
      setOpen(true);
    }
  };

  const handleQuestionChange = (newQuestion, id) => {
    setQuestions((question) =>
      question?.map((list, index) =>
        index === id ? { ...list, question: newQuestion } : list
      )
    );
  };

  const handleAnswerChange = (
    newAnswer,
    answers,
    answerIndex,
    questionIndex
  ) => {
    const newAnswers = [...answers];

    newAnswers[answerIndex] = newAnswer;

    setQuestions((question) =>
      question?.map((list, index) =>
        index === questionIndex ? { ...list, answers: newAnswers } : list
      )
    );
  };

  const handleCorrectAnswer = (answerId, questionIndex) => {
    questions[questionIndex].correctAnswerId = answerId;

    setCorrectAnswer(answerId);
  };

  return (
    <>
      <Typography variant="h2" className={styles.quizTitle}>
        <div className={styles.icon2}>
          <HelpIcon style={{ color: "#cc0000" }} />
        </div>
        Quiz questions
      </Typography>

      {questions.map((question, index) => {
        return (
          <Grid key={index} container className={styles.questionContainer}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  label="What would you like to ask?"
                  variant="outlined"
                  value={question.question}
                  required
                  onChange={(e) => handleQuestionChange(e.target.value, index)}
                />
              </Grid>
              {question.answers.map((answer, key) => {
                return (
                  <Grid key={key} item xs={6}>
                    <TextField
                      style={{ width: "100%" }}
                      id="standard-basic"
                      label="New Answer"
                      variant="outlined"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(
                          e.target.value,
                          question.answers,
                          key,
                          index
                        )
                      }
                      required
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  id="correct-answer"
                  select
                  label="Select the correct Answer"
                  helperText="Please select the correct answer"
                  defaultValue={0}
                  onChange={(e) => handleCorrectAnswer(e.target.value, index)}
                  required
                >
                  {question.answers.map((option, index) => (
                    <MenuItem key={index} value={index}>
                      Answer #{index + 1}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => addAnswer(index)}
                      variant="contained"
                    >
                      <AddIcon />
                      Add answer
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      onClick={() => removeAnswer(index)}
                      style={{ width: "100%" }}
                      variant="contained"
                    >
                      <DeleteIcon />
                      Remove answer
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "red",
                    marginTop: "20px",
                  }}
                  onClick={() => removeQuestion(index)}
                  variant="contained"
                >
                  <DeleteIcon />
                  Remove question
                </Button>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      <div className={styles.publishContainer}>
        <Button
          variant="outlined"
          onClick={() => addQuestion()}
          style={{ marginRight: "15px", fontWeight: "bold" }}
        >
          <AddIcon style={{ marginRight: "5px" }} />
          Add Question
        </Button>
        <Button
          variant="contained"
          type="submit"
          value="Submit"
          style={{ backgroundColor: "#28a428", fontWeight: "bold" }}
        >
          <SaveIcon style={{ marginRight: "5px" }} />
          Publish Quiz
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuizQuestions;
