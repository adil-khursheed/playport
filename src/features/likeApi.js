import { useMutation, useQueryClient } from "@tanstack/react-query";
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
