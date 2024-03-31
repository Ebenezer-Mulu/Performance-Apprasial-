import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

const deleteCollegeAction = async (id) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:5000/api/v1/Colleges/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};

export function useDeleteCollege() {
  const queryClient = useQueryClient();

  const { mutate: deleteCollege, isLoading } = useMutation({
    mutationFn: deleteCollegeAction,
    onSuccess: () => {
      toast.success("College deleted successfully");
      queryClient.invalidateQueries("colleges");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to delete college");
    },
  });

  return { deleteCollege, isLoading };
}
