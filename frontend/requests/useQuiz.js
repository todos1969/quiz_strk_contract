import axios from "axios";
import useSwr from "swr";
import { fetcher } from "./fetcher";

export const createQuiz = async (formData) => {
  try {
    const response = await axios.post(
      process.env.API_NODE_URL + "quiz/create-quiz",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

export const getAllQuiz = () => {
  const url = process.env.API_NODE_URL + "quiz/get-all-quiz";

  const { data, mutate, error, isLoading } = useSwr(url, fetcher);

  return {
    data: data?.allQuiz,
    mutateQuiz: mutate,
    error: error,
    isLoading: isLoading,
  };
};

export const getMyQuizzes = () => {
  const url = process.env.API_NODE_URL + "quiz/get-my-quiz";

  const { data, mutate, error, isLoading } = useSwr(url, fetcher);

  return {
    data: data?.quiz,
    mutateMyQuiz: mutate,
    isLoading: isLoading,
  };
};

export const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(
      process.env.API_NODE_URL + "quiz/delete-quiz/" + id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { error };
  }
};

export const getQuiz = (id) => {
  const url = process.env.API_NODE_URL + "quiz/" + id;

  const { data, mutate, error, isLoading } = useSwr(url, fetcher);

  return {
    data: data?.quiz,
    mutate: mutate,
    isLoading: isLoading,
    error: error,
  };
};
