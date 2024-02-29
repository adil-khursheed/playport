import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useTogglePublishStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ videoId }) => {
      const response = await axiosPrivate.patch(
        `/videos/toggle/publish/${videoId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });

      queryClient.invalidateQueries({
        queryKey: ["channelVideos"],
      });
    },
  });
};
