import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";


const LogIn = () => {
    const { sigIn } = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()
        const password = e.target.password.value
        const email = e.target.email.value

        sigIn(email,password)
        .then(res=>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div>
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-12 mx-auto  ">
                    <div className="flex items-center gap-2 justify-center">

                        <img className="w-12" src="https://i.ibb.co/cXFfVF8/ux.png" alt="" />

                        <p className="text-2xl font-bold">SCC Technovision Inc.</p>
                    </div>
                    <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                Log in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit} >
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Your email</label>
                                    <input type="email" name="email" id="email" className="w-full p-2.5" placeholder="name@company.com" required="" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="w-full p-2.5" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label className="">Remember me</label>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                                </div>
                                <button type="submit" className="w-full focus:ring-4 focus:outline-none bg-blue-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center btn btn-error">Log in</button>
                                <p className="text-sm font-light">
                                    Don’t have an account yet? <Link to='/signIn' className="font-medium text-blue-gray-600 btn ">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LogIn;