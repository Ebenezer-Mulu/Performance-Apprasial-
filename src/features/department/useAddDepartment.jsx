import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const addDepartmentAction = async (departmentData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/v1/departments",
      departmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data found in the response");
    }
  } catch (error) {
    throw error;
  }
};

export function useAddDepartment() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addNewDepartment, isLoading } = useMutation({
    mutationKey: "[add-department]",
    mutationFn: (depData) => addDepartmentAction(depData),
    onSuccess: () => {
      queryClient.invalidateQueries("departments");

      toast.success("Department added successfully");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to add Department");
    },
  });

  return { addNewDepartment, isLoading };
}
