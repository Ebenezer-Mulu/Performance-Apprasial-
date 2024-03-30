import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useAllUser() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["employee"],
    queryFn: () => fetchUser(),
  });

  return { isLoading, users, error };
}

const fetchUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/v1/users", {
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
