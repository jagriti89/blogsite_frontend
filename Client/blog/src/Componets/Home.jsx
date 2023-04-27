
 

import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


const Home = () => {
    let navigate = useNavigate()

    let [allTask, setAllTask] = useState([])
    let [title, setTitle] = useState("")
    let [description, setDescription] = useState("")
    let [status, setStatus] = useState("")


    useEffect(() => { getAllTask() }, [])

    const getAllTask = async () => {

        let result = await fetch("https://dms-todo-back-end.vercel.app/api/getTask", {
            method: "get",
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
        })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            setAllTask(result.data)
        }
    }


    const deleteTask = async (ID) => {
        let userId = JSON.parse(localStorage.getItem("userId"))
        let result = await fetch(`https://dms-todo-back-end.vercel.app/api/deleteTask/${ID}`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify({ userId })
        })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            alert(result.message)
            getAllTask()
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await fetch("https://dms-todo-back-end.vercel.app/api/addTask", {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify({ title, description })
        })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            alert(result.message)
            getAllTask()
        }
    }


    const updateTask = async (ID, status) => {
        let userId = JSON.parse(localStorage.getItem("userId"))

        let result = await fetch(`https://dms-todo-back-end.vercel.app/api/tasks/${ID}`, {
            method: "put",
            headers: { 'Content-Type': 'application/json', 'x-api-key': JSON.parse(localStorage.getItem("token")) },
            body: JSON.stringify({ status, userId })
        })

        result = await result.json()

        if (result.status === false) {
            alert(result.message)
        } else {
            getAllTask()
        }
    }



    return (
        <div className="whole_part">

            <div className="add_task">
                <strong>ADD TASK</strong>
                <hr />
                <form>
                    <div className="input-group">
                        <input 
                            type="text"
                            className="form-control text-capitalize"
                            placeholder="Add Title"
                            name="title"
                            required
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            className="form-control text-capitalize"
                            placeholder="Add Description"
                            name="description"
                            required
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                        <br />
                        <br />
                        <hr />
                        <button onClick={handleSubmit}
                        className="btn btn-block btn-primary mt-3">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>


            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Update Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                      
                    {allTask.length > 0 ?

                        allTask.map((val, key) => {
                            return (
                                <tbody key={key}>
                                    <tr>
                                        <td>{val.title}</td>
                                        <td>{val.description}</td>
                                        <td>{val.status}</td>
                                        <td>

                                            <select className="update_option" name="status" onChange={event => { setStatus(event.target.value); updateTask(val._id, event.target.value) }}
                                            >
                                                <option value="pending" >pending</option>
                                                <option value="in-progress">in-progress</option>
                                                <option value="completed">completed</option>
                                            </select>


                                        </td>
                                        <td><button className="delete_btn" onClick={() => deleteTask(val._id)}>Delete</button></td>
                                    </tr>
                                </tbody>
                            )
                        }) :

                        <tbody>
                            <tr>
                                <td>No Task Available!</td>
                            </tr>
                        </tbody>
                    }
                </table>


            </div>

        </div>
    );
};

export default Home;