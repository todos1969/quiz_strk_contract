import axios from "axios";

export const fetcher = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    return { error };
  }
};
