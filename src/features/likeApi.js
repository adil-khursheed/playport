import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useLikeUnlikeVideo = (videoId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        `/likes/toggle/v/${videoId}`,
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
        queryKey: ["likedVideos"],
      });
    },
  });
};

export const useLikeUnlikeComment = ({ commentId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        `/likes/toggle/c/${commentId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useLikeUnlikeTweets = ({ tweetId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        `/likes/toggle/t/${tweetId}`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tweet"],
      });
    },
  });
};

export const useGetLikedVideos = () => {
  return useQuery({
    queryKey: ["likedVideos"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/likes/videos", {
        withCredentials: true,
      });

      return response.data;
    },
  });
};
