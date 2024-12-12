import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';  // Import Framer Motion

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className='text-center py-12 md:py-16'>
            {/* Container for Hero Section */}
            <motion.div
                className="flex flex-col gap-5 px-4 md:px-8"
                initial={{ opacity: 0, y: 50 }}  // Initial animation state (hidden)
                animate={{ opacity: 1, y: 0 }}   // End animation state (visible)
                transition={{ duration: 1 }}     // Animation duration
            >
                {/* Animated Text */}
                <motion.span
                    className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm md:text-base'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    No. 1 Job Hunt Website
                </motion.span>
                
                <motion.h1
                    className='text-3xl sm:text-4xl md:text-5xl font-extrabold'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </motion.h1>

                <motion.p
                    className='text-sm sm:text-base md:text-lg max-w-3xl mx-auto mt-4'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </motion.p>

                {/* Search Bar with Animation */}
                <motion.div
                    className='flex flex-col sm:flex-row justify-center gap-4 my-6'
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className='w-full sm:w-[70%] lg:w-[40%] flex items-center border border-gray-300 rounded-full shadow-md overflow-hidden'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full py-2 px-4 focus:ring-2 focus:ring-[#6A38C2] transition-all'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-r-full bg-[#6A38C2] text-white py-2 px-6 hover:bg-[#5f2f9e] transition-all"
                        >
                            <Search className='h-5 w-5' />
                        </Button>
                    </div>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                >
                    <Button 
                        className="bg-[#F83002] text-white px-8 py-3 rounded-full hover:bg-[#D92502]"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        Browse Jobs <span className="ml-2">↓</span>
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
