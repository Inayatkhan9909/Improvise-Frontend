import React from "react";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          Welcome to our Course Management Platform, your go-to destination for exploring and enrolling in high-quality classes. Whether you're passionate about sports, technology, arts, or other fields, we connect learners with expert instructors to make skill development easy and engaging.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg mb-4">
          Our mission is to provide a platform that bridges the gap between learners and educators. We aim to empower students by offering diverse courses while giving instructors the tools to share their knowledge effectively.
        </p>
        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
          <li>Wide range of courses across multiple categories</li>
          <li>Seamless and hassle-free booking process</li>
          <li>Personalized course recommendations</li>
          <li>Expert insights and engaging content from instructors</li>
        </ul>
        <h2 className="text-2xl font-semibold text-blue-600 mt-6 mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg mb-4">
          We are committed to offering:
        </p>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
          <li>A user-friendly platform with an intuitive design</li>
          <li>Diverse categories tailored to your interests</li>
          <li>Real-time updates and a visually engaging interface</li>
          <li>A community-centric approach to learning</li>
        </ul>
        <div className="text-center mt-6">
            
          <button
          onClick={()=>navigate('/')}
           className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
            Explore Courses
          </button>
        </div>
      </div>
    </div>
  );
};
