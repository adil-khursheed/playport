import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useToggleSubscription = ({ channelId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.post(
        `/subscriptions/c/${channelId}`,
        {},
        { withCredentials: true }
      );

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
};
