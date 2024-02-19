import { useInfiniteQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetVideoComments = (videoId) => {
  return useInfiniteQuery({
    queryKey: ["comments", videoId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosPrivate.get(
        `/comments/${videoId}?page=${pageParam}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
    getNextPageParam: (lastPage) => lastPage?.data?.nextPage || null,
  });
};
