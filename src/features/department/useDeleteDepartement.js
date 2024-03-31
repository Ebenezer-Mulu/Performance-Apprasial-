import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;
const deleteDepartmentAction = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/v1/departments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  const { mutate: deleteDepartment, isLoading } = useMutation({
    mutationFn: deleteDepartmentAction,
    onSuccess: () => {
      toast.success("Department deleted successfully");
      queryClient.invalidateQueries("departments");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to delete Department");
    },
  });

  return { deleteDepartment, isLoading };
}
