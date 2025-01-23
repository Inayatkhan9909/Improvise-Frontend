import React from "react";

const Footer = () => {
    return (
        <div className=" bg-blue-600 text-white overflow-hidden">

            {/* Footer Content */}
            <footer className=" inset-0 px-4 pt-8 pb-6">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
                    {/* Left Section */}
                    <div className="w-full ">
                        <h1 className="text-2xl font-bold">Improvise</h1>
                        <p className="mt-4 text-sm leading-relaxed">
                            Subscribe to our newsletter to stay updated with the latest news and offers.
                        </p>
                        <form className="mt-4 flex flex-col sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg text-gray-800 w-auto sm:rounded-l-lg sm:rounded-none"
                            />
                            <button
                                type="submit"
                                className="mt-2 sm:mt-0 sm:ml-2 px-4 py-2 bg-yellow-500 text-black rounded-lg sm:rounded-r-lg hover:bg-blue-800"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-6 text-xs leading-tight">&copy; 2024 Your Project Name. All rights reserved.</p>
                    </div>

                    {/* Right Section */}
                    <div className=" flex  gap-6">
                        {/* Sitemap Section */}
                        <div>
                            <h2 className="text-lg font-semibold">Sitemap</h2>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li>
                                    <a href="#home" className="hover:underline">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#about" className="hover:underline">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="hover:underline">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="hover:underline">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Resources Section */}
                        <div>
                            <h2 className="text-lg font-semibold">Resources</h2>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li>
                                    <a href="#faq" className="hover:underline">
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a href="#blog" className="hover:underline">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="#privacy-policy" className="hover:underline">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#terms" className="hover:underline">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
