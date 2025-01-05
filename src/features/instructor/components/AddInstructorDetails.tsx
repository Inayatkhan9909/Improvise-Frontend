import React, { useState } from "react";
import { getFilePreview, uploadFile } from "../../lib/appwrite/uploadImage";

export const AddInstructorDetails = ({ onSubmit }: { onSubmit: (details: any) => void }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    bio: "",
    qualifications: "",
    resume: null as string | null,
    skills: "",
  });
  const [errors, setErrors] = useState({
    bio: "",
    qualifications: "",
    skills: "",
    resume: "",
  });

  const validateForm = () => {
    const newErrors = {
      bio: formData.bio.trim() ? "" : "Bio is required.",
      qualifications: formData.qualifications.trim() ? "" : "Qualifications are required.",
      skills: formData.skills.trim() ? "" : "Skills are required.",
      resume: resumeFile ? "" : "Resume is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setErrors({ ...errors, resume: "" });
    }
  };

  const uploadResume = async (): Promise<string | null> => {
    if (!resumeFile) return null;

    try {
      const uploadedFile = await uploadFile(resumeFile);
      if (!uploadedFile || !uploadedFile.$id) {
        throw new Error("Failed to retrieve file ID after upload.");
      }
      const resumeUrl = getFilePreview(uploadedFile.$id);
      if (!resumeUrl) {
        throw new Error("Failed to get file preview URL.");
      }
      return resumeUrl;
    } catch (error) {
      console.error("Resume upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const resumeUrl = await uploadResume();
    if (!resumeUrl) {
      setErrors({ ...errors, resume: "Failed to upload resume. Please try again." });
      return;
    }

    onSubmit({ ...formData, resume: resumeUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.bio ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us about yourself..."
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.qualifications ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Your qualifications"
        />
        {errors.qualifications && <p className="text-red-500 text-sm">{errors.qualifications}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.skills ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Guitar, Painting, Python"
        />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600"
        />
        {errors.resume && <p className="text-red-500 text-sm">{errors.resume}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};


