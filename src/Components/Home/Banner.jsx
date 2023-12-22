import { Link } from "react-router-dom";
import { motion } from "framer-motion"
const Banner = () => {
    return (
        <div className="py-10">
            <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/QKjt80t/170522-Invest-New-Tech-for-Business.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <div className="hero justify-around">
                            <div className="hero-content flex-col lg:flex-row-reverse justify-around gap-10">
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring easeIn",
                                        stiffness: 260,
                                        damping: 20,
                                        duration: 1,
                                        delayChildren: 0.3,
                                        staggerChildren: 0.2
                                    }
                                    }
                                ><img src="https://i.ibb.co/QX05fRN/what-is-task-management.png" className="max-w-sm rounded-lg shadow-2xl" /></motion.div>

                                <div>
                                    <h1 className="text-5xl font-bold">SCC Technovision Inc.</h1>
                                    <p className="py-6">Efficiency Redefined, Excellence Delivered</p>
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring easeIn",
                                            stiffness: 260,
                                            damping: 20,
                                            duration: 1,
                                            delayChildren: 0.3,
                                            staggerChildren: 0.2
                                        }
                                        }
                                    >
                                        <Link to='/dashboard'>  <button className="btn btn-error">Let’s Explore</button></Link>

                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;