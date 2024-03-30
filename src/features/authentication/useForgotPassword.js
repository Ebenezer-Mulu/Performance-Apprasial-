import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const forgotPasswordAction = async ({ email }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/forgotPassword",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export function useForgotPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: ({ email }) => forgotPasswordAction({ email }),
    onSuccess: () => {
      toast.success(
        "A password reset link has been sent to your email. Please check your inbox."
      );
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email is incorrect");
    },
  });

  return { forgotPassword, isLoading };
}
