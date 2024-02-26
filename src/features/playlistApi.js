import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axios";

export const useGetUserPlaylists = (userId) => {
  return useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/playlist/user/${userId}`, {
        withCredentials: true,
      });

      return response.data;
    },

    enabled: !!userId,
  });
};

export const useGetPlaylistById = (playlistId) => {
  return useQuery({
    queryKey: ["playlistById", playlistId],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/playlist/${playlistId}`, {
        withCredentials: true,
      });

      return response.data;
    },
  });
};
