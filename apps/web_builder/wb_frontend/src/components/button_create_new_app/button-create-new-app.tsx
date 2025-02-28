import React from 'react';
import { Typography, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ButtonCreateNewApp: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateToAddElementApp = () => {
        navigate("/add-element-app");
    };

    const handleClose = () => {
        navigate('/dashboard');
    };

    return (
        <div className="p-5 h-screen flex flex-col">
            {/* Header Content */}
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="text-lg font-semibold">
                    Creating new app
                </Typography>
                <button
                    onClick={handleClose}
                    className="text-xl font-bold text-black hover:text-gray-600"
                >
                    ×
                </button>
            </div>

            <Divider className="my-2 border-gray-300" />
            
            <div className="mb-4" />

            {/* Action Content */}
            <div className="flex justify-between items-center mb-4">
                <Typography variant="body1" className="text-sm text-gray-800">
                    Use Pre-Designed Template
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleNavigateToAddElementApp}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                    <Typography className="text-sm">Start from scratch</Typography>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            d="M4 12H20M13 5L20 12L13 19"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </div>

            {/* Image Section */}
            <div className="bg-gray-200 p-6 rounded-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 mt-4">
                    <div className="w-full h-full overflow-hidden rounded-xl shadow-md">
                        <img
                            src="/demo_template_new_app/image 12.png"
                            alt="Image 1"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden rounded-xl shadow-md">
                        <img
                            src="/demo_template_new_app/image 13.png"
                            alt="Image 2"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden rounded-xl shadow-md">
                        <img
                            src="/demo_template_new_app/image 14.png"
                            alt="Image 3"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="w-full h-full overflow-hidden rounded-xl shadow-md">
                        <img
                            src="/demo_template_new_app/image 14.png"
                            alt="Image 4"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};