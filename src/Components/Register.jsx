import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import auth from "./firebase.js/firebase";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "./Hooks/useAxiosPublic";


const Register = () => {
    const axiosPublic =useAxiosPublic()

    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const password = e.target.password.value
        const email = e.target.email.value
        const profession = e.target.profession.value
        const image = e.target.photoUrl.files[0]
       
        const formData = new FormData()
        formData.append('image', image)
        const res = await axios.post('https://api.imgbb.com/1/upload?key=8c18d2802c17409cea414bbb6076ba41', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        const photo = res.data.data.display_url

        const userData ={name,email,profession,photo}

        if (/^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password)) {
            createUser(email, password)
                .then((res) => {
                    console.log(res.data);
                    const user = auth.currentUser
                    if (user) {
                        updateProfile(user, {
                            displayName: name,
                            photoURL: photo,
                        })
                        axiosPublic.post('/users', { userData })
                        .then(res => {
                            console.log(res.data)   
                        })
                    }
                    navigate('/')
                })
                .catch(err=>{
                    console.log(err);
                })
        }
        else{
            console.log('fdf');
        }

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
                                Register in to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit} >
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Your Name</label>
                                    <input type="name"  name="name" id="name" className="w-full p-2.5" placeholder="name" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium ">Your Photo</label>
                                    <input type="file" name="photoUrl" id="photo" className="" placeholder="photo" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Your Profession</label>
                                    <input type="text" name="profession" id="profession" className="w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Your Email</label>
                                    <input type="email" name="email" id="email" className="w-full p-2.5" placeholder="name@company.com" required />
                                </div>
                               
                                <div>
                                    <label className="block mb-2 text-sm font-medium  ">Password</label>
                                    <input type="password"  name="password" id="password" placeholder="••••••••" className="w-full p-2.5" required />
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
                                    Have an account? <Link to='/logIn' className="font-medium text-blue-gray-600 btn ">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;