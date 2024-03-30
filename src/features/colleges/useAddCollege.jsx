import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const addCollegeAction = async (collegeData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:5000/api/v1/Colleges",
      collegeData,
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

export function useAddCollege() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: addCollege, isLoading } = useMutation({
    mutationKey: "[add-college]",
    mutationFn: (collegeData) => addCollegeAction(collegeData),
    onSuccess: (college) => {
      queryClient.invalidateQueries("colleges");
      navigate("/admin/Colleges", { replace: true });
      toast.success("College added successfully");
    },
    onError: (err) => {
      console.error("ERROR", err);
      toast.error("Failed to add college");
    },
  });

  return { addCollege, isLoading };
}
