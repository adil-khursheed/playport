import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post("/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    },
  });
};
