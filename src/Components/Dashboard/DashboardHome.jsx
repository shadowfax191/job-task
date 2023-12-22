import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const DashboardHome = () => {
    const {user}=useContext(AuthContext)
    return (
        <div className="text-center flex flex-col items-center lg:pl-80">
           <h1 className="text-5xl">Welcome Back</h1>
           <p className="text-3xl capitalize">{user.displayName}</p>
        </div>
    );
};

export default DashboardHome;