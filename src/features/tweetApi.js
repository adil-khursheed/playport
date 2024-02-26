import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetUserTweets = (userId) => {
  return useQuery({
    queryKey: ["tweet"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/tweets/user/${userId}`, {
        withCredentials: true,
      });

      return response.data;
    },
    enabled: !!userId,
  });
};
