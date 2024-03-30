import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const isAuthenticated = !!user;
  return { isLoading, user, isAuthenticated };
}

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:5000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
