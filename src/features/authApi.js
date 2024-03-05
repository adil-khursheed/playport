import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { axiosPrivate } from "../api/axios";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      return response;
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/users/current-user", {
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useGetUserChannelProfile = (username) => {
  return useQuery({
    queryKey: ["getUserProfile"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/users/c/${username}`, {
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useGetUserWatchHistory = () => {
  return useQuery({
    queryKey: ["getUserWatchHistory"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/users/watch-history", {
        withCredentials: true,
      });

      return response.data;
    },
  });
};
