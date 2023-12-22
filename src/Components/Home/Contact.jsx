

const Contact = () => {
    return (
        <div>
            <div className="text-center  space-y-3">
                <form  className=" space-y-3 max-w-lg mx-auto">
                    <p className="text-3xl font-bold py-10">Contact Form</p>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Your Name</label>
                        <input type="text" id="large-input" className="block w-full border-2  p-4 border-error rounded-md" />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Your Phone Number</label>
                        <input type="number" id="large-input" className="block w-full border-2  p-4 border-error rounded-md" />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Your Email</label>
                        <input type="email" id="large-input" className="block w-full border-2  p-4 border-error rounded-md" />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-lg font-medium">Your Massage</label>
                        <input type="text" id="large-input" className="block w-full border-2 h-28  p-4 border-error rounded-md" />
                    </div>
                    <input className="px-5 p-1 bg-blue-gray-200 rounded-xl" type="submit" />

                </form>
            </div>
        </div>
    );
};

export default Contact;