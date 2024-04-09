import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export function useAllDepartment() {
  const {
    isLoading,
    data: departments,
    error,
  } = useQuery({
    queryKey: ["departments"],
    queryFn: () => fetchDepartment(),
  });

  return { isLoading, departments, error };
}

const fetchDepartment = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/api/v1/departments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
