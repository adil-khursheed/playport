import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetChannelStats = () => {
  return useQuery({
    queryKey: ["channelStats"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/dashboard/stats", {
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useGetChannelVideos = () => {
  return useQuery({
    queryKey: ["channelVideos"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/dashboard/videos", {
        withCredentials: true,
      });

      return response.data;
    },
  });
};
