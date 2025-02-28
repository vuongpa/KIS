import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { setData, useAppDispatch } from '../../redux_logic';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { callPostAPI } from '../../api_utils';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  username: string;
}

interface LoginFormData {
  username: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (data: LoginFormData): Promise<LoginResponse> => {
    const loginResponse = await callPostAPI(
      "/login",
      {
        username: data.username,
        password: data.password,
      }
    );
    console.log("loginResponse",loginResponse)
    return loginResponse.data;
  };

  // useMutation for handling login request
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (responseData: LoginResponse) => {
      // Dispatch action to save user data to Redux store
      appDispatch(setData({
        isLoggedIn: true,
        accessToken: responseData.accessToken,
        userId: responseData.userId,
        userName: responseData.username,
      }));

      localStorage.setItem("refreshToken", responseData.refreshToken);
      
      // Display success message and redirect to dashboard
      toast.success("Login successful!", {position: "top-right"});
      navigate("/dashboard");
    },
    onError: (error: any) => {
      // Display error message if login fails
      toast.error(error?.response?.data?.error || "An error occurred while logging in.");
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h1>

        {/* Username Field */}
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your username"
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};