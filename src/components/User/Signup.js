import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        const payload = { name, email, password }
        try {
            const { data } = await axios.post('http://localhost:3001/api/register', payload)
            console.log(data)
            if (data.status === "ok") {
                window.location = ('/')
            }
        } catch (error) {
            const toast = Swal.mixin({
                toast: true,
                position: "top-end",
                timer: 3000
            })
            toast.fire({
                icon: "error",
                title: error.response.data.message
            })
            console.log(error.response.data.message)
        }
    }


    return (
        <div className='signup ui container'>
            <h2>Register</h2>
            <form className='ui form' onSubmit={registerUser}>
                <div class="three fields">
                    <div class="field">
                        <label>Your Name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div class="field">
                        <label>Your Email</label>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="field">
                        <label>Your Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button class="ui button" type="submit">Register</button>
                    <Link to="/" class="ui button" type="submit">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup

