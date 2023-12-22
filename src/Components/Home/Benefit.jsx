/* eslint-disable react/no-unescaped-entities */

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
const Benefit = () => {
    const axiosPublic = useAxiosPublic()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`)
            return res.data
        }
    })
    console.log(users);
    return (
        <div>
            <h2 className='text-4xl font-bold text-center pb-10'>Our Users</h2>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    users.map(user =>
                        <SwiperSlide key={user._id}><div className='text-center  space-y-2'>
                            <div className='flex justify-center'> <img src={user.userData.photo} className='w-24 h-24  rounded-full' alt="" /></div>
                            <p className='capitalize text-2xl'>{user.userData.name}</p>
                            <p className='capitalize text-2xl'>Profession: {user.userData.profession}</p>

                        </div></SwiperSlide>
                    )
                }

            </Swiper>
            <div className='py-10 text-center'>
                <h2 className='text-2xl'>Everyone will benefit from our website</h2>
                <p className='pt-3'>Our platform, featuring to-do lists, ongoing tasks, and completed items, caters to a diverse audience. Whether you're a developer, corporate professional, banker, or anyone seeking organized task management, our flexible interface ensures a seamless experience tailored to your needs.</p>
            </div>
        </div>
    );
};

export default Benefit;