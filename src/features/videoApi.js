import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetAllVideos = () => {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosPrivate.get(`/videos?page=${pageParam}`, {
        withCredentials: true,
      });

      return response?.data;
    },
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage || null,
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
