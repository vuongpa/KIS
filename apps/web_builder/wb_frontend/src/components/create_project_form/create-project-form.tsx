import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getBaseApiUrl } from "../../config_helper";
import { useNavigate } from "react-router-dom";
import { selectAccessToken, useAppSelector } from "../../redux_logic";

interface ProjectFormValues {
  name: string;
  alias: string;
  description: string;
  thumbnail?: string;
}

const projectSchema = yup.object({
  name: yup.string().required("Project name is required"),
  alias: yup.string().required("Alias is required").matches(/^[a-z0-9-_]+$/, "Alias should be lowercase and hyphen-separated"),
  description: yup.string().required("Description is required"),
  thumbnail: yup.string().url("Invalid URL format").optional(),
});

interface CreateProjectFormProps {
  onClose: () => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const token = useAppSelector(selectAccessToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectFormValues>({
    resolver: yupResolver(projectSchema),
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
    setValue("thumbnail", e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (newProject: ProjectFormValues) => {
      const formData = new FormData();
      formData.append("name", newProject.name);
      formData.append("alias", newProject.alias);
      formData.append("description", newProject.description);
      if (newProject.thumbnail) {
        formData.append("thumbnail", newProject.thumbnail);
      }

      try {
        const response = await axios.post(
          getBaseApiUrl() + "/create-new-project", formData,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        console.log("Response from server:", response);
        return response.data;
      } catch (error: any) {
        console.error("Error during API call:", error);
        throw new Error(error.response?.data?.error || "Failed to create project");
      }

    },
    onSuccess: () => {
      navigate("/projects");
      toast.success("Project created successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create project");
    },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col bg-gray-100 p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Project</h2>

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Project Name:</label>
            <input
              {...register("name")}
              className="border p-3 w-full rounded mt-1 text-lg"
              placeholder="Enter project name"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Alias */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Alias:</label>
            <input
              {...register("alias")}
              className="border p-3 w-full rounded mt-1 text-lg"
              placeholder="Enter project alias"
            />
            <p className="text-red-500 text-sm">{errors.alias?.message}</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Description:</label>
            <textarea
              {...register("description")}
              className="border p-3 w-full rounded mt-1 text-lg"
              placeholder="Enter project description"
              rows={4}
            />
            <p className="text-red-500 text-sm">{errors.description?.message}</p>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Thumbnail URL:</label>
            <input
              type="text"
              {...register("thumbnail")}
              className="border p-3 w-full rounded mt-1 text-lg"
              placeholder="Enter image URL"
              onChange={handleThumbnailChange}
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Preview:</p>
                <img src={preview} alt="Thumbnail Preview" className="w-full h-48 object-cover rounded-lg border" />
              </div>
            )}
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => {
                navigate("/projects");
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
