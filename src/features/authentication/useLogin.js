import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const loginAction = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      {
        email,
        password,
      }
    );
    if (response.data) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    } else {
      throw new Error("No data found in the response");
    }
  } catch (error) {
    throw error;
  }
};

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAction({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data);
      navigate("/admin", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
