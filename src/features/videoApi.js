import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
    queryKey: ["videos"],
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
