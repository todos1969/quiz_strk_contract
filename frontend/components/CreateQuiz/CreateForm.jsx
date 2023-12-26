import React, { useState } from "react";
import QuizQuestions from "./QuizQuestions";
import QuizInformations from "./QuizInformations";
import { createQuiz } from "@/requests/useQuiz";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";

const questionTemplate = {
  question: "",
  answers: ["", ""],
  correctAnswerId: 0,
};

const CreateForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState({
    image: null,
    previewUrl: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const [questions, setQuestions] = useState([questionTemplate]);

  const saveQuiz = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      setError("Upload an image for your quiz");
      setOpen(true);
      return;
    }
    const formData = new FormData();

    formData.append("image", selectedImage.image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("questions", JSON.stringify(questions));

    const result = await createQuiz(formData);

    if (result?.error?.response?.data?.error) {
      if (result?.error?.response?.data?.error === "jwt malformed") {
        setError("Connect your wallet to create a quiz");
      } else {
        setError("An error occured");
      }
      setOpen(true);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      onSubmit={(e) => saveQuiz(e)}
      style={{ marginTop: "25px", paddingBottom: "50px" }}
    >
      <QuizInformations
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <QuizQuestions questions={questions} setQuestions={setQuestions} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default CreateForm;
