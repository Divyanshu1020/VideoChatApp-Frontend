import axios from "./axios.config";
import Url from "../constants/url";
import { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

// Utility to handle Axios errors and return meaningful messages
const handleAxiosError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const backendMessage: string = error.response?.data?.message; 


    if (error.response?.status === 401) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      console.error("Axios Error:", error.message);
      return backendMessage || "User not authenticated";
    }

    return backendMessage || "An error occurred. Please try again.";
  }

  console.log("API call failed");
  return "An unknown error occurred";
};

export const getUserData = async () => {
  try {
    const response = await axios.get(Url.getUserData);
    return response.data.data; // Assuming the data is in `data.data`
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage); 
  }
};

export const login = async (data: { identifier: string; password: string }) => {
  try {
    const response = await axios.post(Url.login, data);
    return response.data.data; 
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage); 
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(Url.logout);
    return response.data.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw new Error(errorMessage ); 
  }
};
