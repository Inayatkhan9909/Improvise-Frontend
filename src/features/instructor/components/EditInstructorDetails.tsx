import React, { useContext, useState } from "react";
import { getFilePreview, uploadFile } from "../../lib/appwrite/uploadImage";
import { RxCross2 } from 'react-icons/rx';
import { UserContext } from "../../Context/user/userContext";
import { useProfileAuth } from "../../components/Profile/hooks/useProfileAuth";

interface Instructor {
  bio: string;
  qualifications: string;
  skills: string[];
  resume: string | null;
}

interface EditInstructorDetailsProps {
  instructor: Instructor;
  onClose: () => void;
}

export const EditInstructorDetails: React.FC<EditInstructorDetailsProps> = ({
  instructor,
  onClose,
}) => {
    const {setUser} = useContext(UserContext);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const {updateinstructorDetails,loading} = useProfileAuth();
  const [formData, setFormData] = useState({
    bio: instructor.bio || "",
    qualifications: instructor.qualifications || "",
    skills: instructor.skills?.join(", ") || "",
    resume: instructor.resume || "",
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
      qualifications: formData.qualifications.trim()
        ? ""
        : "Qualifications are required.",
      skills: formData.skills.trim() ? "" : "Skills are required.",
      resume: formData.resume || resumeFile ? "" : "Resume is required.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    if (!resumeFile) return formData.resume;

    try {
      const uploadedFile = await uploadFile(resumeFile);
      if(!uploadedFile){
        console.error("Resume upload failed:");
        return null;
      }
      const resumeUrl = getFilePreview(uploadedFile.$id);
      if(!resumeUrl){
        console.error("Resume upload failed:");
        return null;
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

    const updatedDetails = { ...formData, resume: resumeUrl };
    try {
       const response = await updateinstructorDetails(updatedDetails);
        if (response.status === 200) {
          
          alert("Details submitted successfully! Waiting for admin approval.");
          setUser(response?.data?.isUser);
          
        } else {
          alert("Error submitting details. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg w-full">
      <div className="flex justify-between">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      <button onClick={onClose}>
<RxCross2/>
      </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.bio ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Qualifications
        </label>
        <input
          type="text"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.qualifications ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.qualifications && (
          <p className="text-red-500 text-sm">{errors.qualifications}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className={`w-full border rounded-lg p-2 ${
            errors.skills ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Resume</label>
        {formData.resume && (
          <div className="mb-2">
            <a
              href={formData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Current Resume
            </a>
          </div>
        )}
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
        Save Changes
      </button>
    </form>
  );
};
