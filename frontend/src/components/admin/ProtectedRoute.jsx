import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            navigate("/");
        } else {
            setLoading(false); // If user is authorized, stop loading
        }
    }, [user, navigate]);

    if (loading) {
        // You can show a loading spinner or placeholder content while checking the user
        return (
            <div className="flex justify-center items-center w-screen h-screen">
                <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-16 h-16"></div>
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
