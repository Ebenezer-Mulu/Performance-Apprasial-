import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useAllCollege() {
  const {
    isLoading,
    data: Colleges,
    error,
  } = useQuery({
    queryKey: ["colleges"],
    queryFn: () => fetchCollege(),
  });

  return { isLoading, Colleges, error };
}

const fetchCollege = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/api/v1/colleges", {
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
