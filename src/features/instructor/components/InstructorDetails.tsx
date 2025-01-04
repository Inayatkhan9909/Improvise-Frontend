import React, { useState } from "react";

const InstructorDetailsForm = ({ onSubmit }: { onSubmit: (details: any) => void }) => {
    const [formData, setFormData] = useState({
        bio: "",
        qualifications: "",
        resume: null,
        skills: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files && e.target.files[0]) {
        //   setFormData({ ...formData, resume: e.target.files[0] });
        // }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Tell us about yourself..."
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
                <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="Your qualifications"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    placeholder="e.g., Guitar, Painting, Python"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-600"
                    required
                />
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

export default InstructorDetailsForm;
