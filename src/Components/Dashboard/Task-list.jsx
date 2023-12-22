/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const Task = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)
    const Uid = user?.uid

    const { register, handleSubmit } = useForm()

    const info = 'todo'

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks`)
            return res.data
        }
    })

    const task = tasks.filter(data => data.Uid === user?.uid)


    refetch()
    const onSubmit = (data) => {
        axiosPublic.post('/tasks', { data, info, Uid })
            .then(res => {
                console.log(res.data)
                refetch()
            })
        refetch()
    }

    refetch()

    const TableRow = ({ task }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'table_row',
            item: {
                type: 'table_row', taskId: task._id
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }))


        const handleUpdate = (e, id) => {
            e.preventDefault()
            const tittle = e.target.title.value
            const description = e.target.des.value
            const deadline = e.target.deadline.value
            const priority = e.target.prio.value
            const data = { tittle, description, deadline, priority }
            console.log(data);
            axiosPublic.put(`/upTasks/${id}`, { data })
                .then(res => {
                    console.log(res.data);
                    refetch()
                }

                )
        }
        return (

           <div>
            <thead>
                        <tr className="text-center">

                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
             <tr key={task?._id} className="pb-2 border-b border-error "
                ref={(node) => drag(node)}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move'
                }} >
                <td className="">{task.data.tittle}</td>
                <td>{task.data.description}</td>
                <td>{task.data.deadline}</td>
                <td>{task.data.priority}</td>
                <td className="space-y-3 flex flex-col">
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-error hover:underline">Edit</button>
                    <button onClick={() => handleDelete(task._id)} className="text-error hover:underline">Delete</button>
                   
                </td>
               
            </tr>
            <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                               
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                            </form>
                            <form onSubmit={(e) => handleUpdate(e, task._id)}>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Tittle </span>
                                    </label>
                                    <input name="title" type="text" required placeholder="Type here" className="input input-bordered input-error w-full " />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input name="des" type="text" required placeholder="Type here" className="input input-bordered input-error w-full " />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Deadline</span>
                                    </label>
                                    <input name="deadline" type="date" required placeholder="Type here" className="input input-bordered input-error w-full " />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Priority</span>
                                    </label>
                                    <select name="prio" required className="select select-error w-full max-w-xs">
                                        <option>Low</option>
                                        <option>Moderate</option>
                                        <option>High</option>

                                    </select>

                                </div>
                                <input type="submit" className="btn btn-error mt-9" />
                            </form>
                        </div>
                    </dialog>
           </div>


        )
    }


    const handleDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${id}`)
                    .then(res => {
                        refetch()
                        if (res.data.acknowledged) {
                            swalWithBootstrapButtons.fire({

                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch()
                    }

                    )



            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your task  is safe :)",
                    icon: "error"
                });
            }
        });
    }

    const TodoTable = ({ onDrop }) => {
        const [, drop] = useDrop(() => ({
            accept: 'table_row',
            drop: (item) => {


                onDrop('todo', item.taskId)
            }
        }))
        return (
            <div className=" overflow-x-auto flex-1  border rounded-md border-error " ref={drop}>
                <h2 className="text-2xl text-center">Todo Task</h2>

                <table className="table">

                    {/* <thead>
                        <tr>

                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {task.filter(tas => tas?.info === 'todo').map(tas =>
                            <TableRow key={tas._id} task={tas} ></TableRow>)}

                    </tbody>
                </table>
            </div>
        )
    }
    const OngoingTable = ({ onDrop }) => {
        const [, drop] = useDrop(() => ({
            accept: 'table_row',
            drop: (item,) => {



                onDrop('ongoing', item.taskId)
            }
        }))
        return (
            <div className=" overflow-x-auto flex-1  border rounded-md border-error " ref={drop}>
                <h2 className="text-2xl text-center">Ongoing Task</h2>

                <table className="table">

                    {/* <thead>
                        <tr>

                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {task.filter(tas => tas?.info === 'ongoing').map(tas =>
                            <TableRow key={tas._id} task={tas}></TableRow>)}

                    </tbody>
                </table>
            </div>
        )
    }
    const CompleteTable = ({ onDrop }) => {
        const [, drop] = useDrop(() => ({
            accept: 'table_row',
            drop: (item) => {



                onDrop('complete', item.taskId)
            }
        }))
        return (
            <div className=" overflow-x-auto flex-1  border rounded-md border-error " ref={drop}>
                <h2 className="text-2xl text-center">Complete Task</h2>

                <table className="table">

                    {/* <thead>
                        <tr>

                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Priority</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {task.filter(tas => tas?.info === 'complete').map(tas =>
                            <TableRow key={tas._id} task={tas}></TableRow>)}

                    </tbody>
                </table>
            </div>
        )
    }



    // const [dropInfo, setDropInfo] = useState(null);


    const handleDrop = (table, id) => {

        if (table === 'todo') {
            axiosPublic.put(`/tasks/${id}`, { table })
                .then(
                    refetch()
                )
        }
        if (table === 'ongoing') {
            axiosPublic.put(`/tasks/${id}`, { table })
                .then(
                    refetch()
                )

        }
        if (table === 'complete') {
            axiosPublic.put(`/tasks/${id}`, { table })
                .then(
                    refetch()
                )

        }
        refetch()

    }

    return (
        <div>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="lg:flex gap-5 mx-auto p-5" >
                    <div>
                        <label className="label">
                            <span className="label-text">Tittle</span>
                        </label>
                        <input {...register("tittle")} type="text" required placeholder="Type here" className="input input-bordered input-error w-full " />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input {...register("description")} type="text" required placeholder="Type here" className="input input-bordered input-error w-full " />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input {...register("deadline")} type="date" required placeholder="Type here" className="input input-bordered input-error w-full " />
                    </div>

                    <div>
                        <label className="label">
                            <span className="label-text">Priority</span>
                        </label>
                        <select {...register("priority")} required className="select select-error w-full max-w-xs">
                            <option>Low</option>
                            <option>Moderate</option>
                            <option>High</option>

                        </select>

                    </div>
                    <input type="submit" className="btn btn-error mt-9" />
                </div>

            </form>
            <h2 className="text-3xl font-bold py-7 text-center ">Task Management</h2>
            <div className="lg:flex gap-3 overflow-x-auto max-w-screen-lg mx-auto p-3 md:space-y-3 lg:space-y-0">
                <DndProvider backend={HTML5Backend}>
                    <TodoTable onDrop={handleDrop}></TodoTable>
                    <OngoingTable onDrop={handleDrop}></OngoingTable>

                    <CompleteTable onDrop={handleDrop}></CompleteTable>
                </DndProvider>
            </div>
        </div>
    );
};

export default Task;