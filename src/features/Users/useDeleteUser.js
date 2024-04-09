import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import styled from "styled-components";
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;

const deleteUserAction = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`http://localhost:5000/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: deleteUserAction,
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries("employee");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to delete User");
    },
  });

  return { deleteUser, isLoading };
}
