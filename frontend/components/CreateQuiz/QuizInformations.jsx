import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import styles from "./createQuizz.module.css";

const QuizInformations = ({
  title,
  setTitle,
  description,
  setDescription,
  setSelectedImage,
}) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImageUpload(image);
    if (image) {
      const reader = new FileReader();

      reader.onload = () => {
        setSelectedImage({
          image,
          previewUrl: reader.result,
        });
      };

      reader.readAsDataURL(image);
    }
  };

  return (
    <div style={{ marginBottom: "25px 0" }}>
      <Typography variant="h2" className={styles.quizTitle}>
        <div className={styles.icon}>
          <InfoIcon style={{ color: "#28a428" }} />
        </div>
        Quiz informations
      </Typography>
      <TextField
        style={{ width: "100%", marginBottom: "25px" }}
        id="standard-basic"
        label="What is the title of your quiz?"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        inputProps={{ maxLength: 100 }}
        helperText={`${title.length}/${100}`}
        required
      />
      <TextField
        style={{ width: "100%" }}
        id="outlined-multiline-static"
        label="Tell the participants what this quiz is about"
        multiline
        value={description}
        inputProps={{ maxLength: 225 }}
        helperText={`${description.length}/${225}`}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />
      <Typography variant="h6" className={styles.quizTitle}>
        <div className={styles.iconNFT}>
          <CloudUploadIcon style={{ color: "black" }} />
        </div>
        Upload the NFT image
      </Typography>
      {imageUpload ? (
        <div style={{ marginTop: "25px" }}>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(imageUpload)}
          />
          <br />
          <Button
            style={{ backgroundColor: "red", marginTop: "20px" }}
            onClick={() => setImageUpload(null)}
            variant="contained"
          >
            Remove Image
          </Button>
        </div>
      ) : (
        <div style={{ marginTop: "25px" }}>
          <input
            accept="image/*"
            className={styles.input}
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleImage(e)}
          />
          <label htmlFor="contained-button-file">
            <div className={styles.uploadFile}>
              <AddPhotoAlternateIcon style={{ fontSize: "50px" }} />
              <Typography
                variant="body1"
                style={{ fontSize: "25px", marginTop: "10px" }}
              >
                Click to upload
              </Typography>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default QuizInformations;
