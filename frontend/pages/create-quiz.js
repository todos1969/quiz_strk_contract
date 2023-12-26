import React from "react";
import Header from "@/components/Header/Header";
import CreateForm from "@/components/CreateQuiz/CreateForm";

import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const createQuiz = () => {
  return (
    <>
      <Header />
      <Container style={{ marginTop: "50px" }} maxWidth="lg">
        <Typography
          variant="h1"
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            display: "flex",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              height: "50px",
              width: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              borderRadius: "50%",
              backgroundColor: "#FFE7C7",
              marginRight: "15px",
            }}
          >
            <EmojiEventsIcon style={{ color: "#FFB13C" }} />
          </div>
          Create your Quiz
        </Typography>
        <Divider style={{ margin: "25px 0" }} />
        <CreateForm />
      </Container>
    </>
  );
};

export default createQuiz;
