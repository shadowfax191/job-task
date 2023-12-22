import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Navbar = () => {
    const { user, LogOut } = useContext(AuthContext)
    const links = <>

        <NavLink to='/'><li>Home</li></NavLink>
        <NavLink to='/dashboard'><li>Dashboard</li></NavLink>
        <NavLink to='/about'><li>About Us</li></NavLink>
        <NavLink to='/contact'><li>Contact Us</li></NavLink>

    </>
    const handleLogOut = () => {
       
        LogOut()
    }

    return (
        <div>
            <div className="navbar bg-base-100 pt-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <button className="btn btn-ghost text-xl">SCC Technovision Inc.</button>
                </div>
                <div className="navbar-center hidden lg:flex gap-3">
                    <ul className="menu menu-horizontal px-1 gap-5 text-lg">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className="dropdown  dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1"><img className="w-12 h-12 rounded-full" src={user.photoURL} alt="" /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-error rounded-box w-44 text-center">
                                <p className="capitalize text-xl pb-3 font-bold">{user.displayName}</p>
                                <button onClick={handleLogOut} className="btn btn-outline  ">Log Out</button>
                            </ul>
                        </div>
                            :
                            <Link to='/login'> <button  className="btn   btn-error ">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;