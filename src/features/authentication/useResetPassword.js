import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const resetPasswordAction = async ({ password, token }) => {
  console.log(password, token);
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/v1/users/resetPassword/${token}`,
      {
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useResetPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: ({ password, token }) =>
      resetPasswordAction({ password, token }),
    onSuccess: () => {
      console.log("somthing go wor");
      toast.success("Password Successfully Reset!");
      navigate("/login");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Oops! Something went wrong. Please try again later.");
    },
  });

  return { resetPassword, isLoading };
}
