// src/api/api.ts

import axios from "./axios.config";
import Url from "../constants/url";
import { AxiosError } from "axios";

// Utility to handle Axios errors
const handleAxiosError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error("Axios Error:", error.message);
    if (error.response?.status === 401) {
      console.error("User not authenticated");
      return null;
    }
  }
  console.log("API call failed");
  return null;
};

export const getUserData = async () => {
  try {
    const response = await axios.get(Url.getUserData);
    return response.data.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const login = async (data: { identifier: string; password: string }) => {
  try {
    const response = await axios.post(Url.login, data);
    return response.data.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(Url.logout);
    console.log("Logout successful:", response);
  } catch (error) {
    return handleAxiosError(error);
  }
};
