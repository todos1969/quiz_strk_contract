import axios from "axios";
import useSwr from "swr";
import { fetcher } from "./fetcher";

export const loginUser = async (address, account) => {
  try {
    const response = await axios.post(process.env.API_NODE_URL + "auth/login", {
      address,
      account,
    });
    localStorage.setItem("accessToken", response.data.token);
  } catch (error) {
    return { error };
  }
};

export const getUser = () => {
  const url = process.env.API_NODE_URL + "auth/getUser";

  const { data, mutate, error, isLoading } = useSwr(url, fetcher);

  return {
    userAddress: data?.user?.address,
    account: data?.user?.account,
    mutateUser: mutate,
    error: error,
    isLoading: isLoading,
  };
};
