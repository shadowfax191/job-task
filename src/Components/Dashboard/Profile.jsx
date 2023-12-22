import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Profile = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    return (
        <div className="lg:pl-80">
            <div className=" hero bg-base-200 w-full text-center">
                <div className="hero-content flex-col justify-center text-center mx-auto">
                    <img src={user.photoURL} className="max-w-sm max-h-64 rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold capitalize pt-8">{user.displayName}</h1>
                        <p className="py-6">Email: {user.email}</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;