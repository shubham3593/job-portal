import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle mobile menu

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6">
                <div>
                    <h1 className="text-2xl font-bold">Job<span className="text-[#F83002]">Portal</span></h1>
                </div>
                {/* Hamburger Menu for Mobile */}
                <div className="sm:hidden flex items-center">
                    <Button
                        className="text-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✖' : '☰'}
                    </Button>
                </div>
                <div className="hidden sm:flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {/* User Authentication / Profile Section */}
                    {user ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="User Avatar" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        {user.role === 'student' && (
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-5">
                    <ul className="flex flex-col items-center font-medium">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies" className="py-2">Companies</Link></li>
                                <li><Link to="/admin/jobs" className="py-2">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/" className="py-2">Home</Link></li>
                                <li><Link to="/jobs" className="py-2">Jobs</Link></li>
                                <li><Link to="/browse" className="py-2">Browse</Link></li>
                            </>
                        )}
                    </ul>

                    {/* User Auth Links on Mobile */}
                    <div className="flex flex-col items-center gap-2 mt-4">
                        {user ? (
                            <div className="flex flex-col items-center">
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt="User Avatar" />
                                </Avatar>
                                <h4 className="mt-2">{user?.fullname}</h4>
                                <Button onClick={logoutHandler} variant="link" className="mt-2">Logout</Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
