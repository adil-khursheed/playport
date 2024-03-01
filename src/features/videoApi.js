import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetAllVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get(`/videos?page=${pageParam}`, {
        withCredentials: true,
      });

      return response?.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage || null,
  });
};

export const useGetVideoById = (videoId) => {
  return useQuery({
    queryKey: ["videos", videoId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/videos/${videoId}`, {
        withCredentials: true,
      });

      return response.data;
    },
  });
};

export const useGetVideosByQuery = (searchTerm) => {
  return useInfiniteQuery({
    queryKey: ["search", searchTerm],
    queryFn: async ({ pageParam }) => {
      let data;
      if (searchTerm) {
        const response = await axiosPrivate.get(
          `/videos?page=${pageParam}&query=${searchTerm}`,
          {
            withCredentials: true,
          }
        );

        data = response.data;
      }
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage ?? null,
  });
};

export const useGetVideosByUserId = (userId) => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam }) => {
      const response = await axiosPrivate.get(
        `/videos?page=${pageParam}&userId=${userId}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage ?? null,
    enabled: !!userId,
  });
};

export const useUploadAVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosPrivate.post(`/videos`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

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

export const useUpdateAVideo = ({ videoId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }) => {
      const response = await axiosPrivate.patch(
        `/videos/${videoId}`,
        { ...data },
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["videos", data.data._id],
      });
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["channelVideos"],
      });
    },
  });
};

export const useDeleteVideo = ({ videoId }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await axiosPrivate.delete(`/videos/${videoId}`, {
        withCredentials: true,
      });

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
