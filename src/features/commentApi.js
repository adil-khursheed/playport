import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetVideoComments = (videoId) => {
  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get(
        `/comments/${videoId}?page=${pageParam}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage || undefined,
  });
};

export const useAddVideoComments = (videoId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content) => {
      const response = await axiosPrivate.post(
        `/comments/${videoId}`,
        { content },
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

      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
};

export const useUpdateVideoComments = ({ commentId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content) => {
      const response = await axiosPrivate.patch(
        `/comments/c/${commentId}`,
        { content },
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

export const useDeleteVideoComment = ({ commentId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.delete(`/comments/c/${commentId}`, {
        withCredentials: true,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
};
