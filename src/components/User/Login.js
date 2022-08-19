import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import CartContext from '../../store/cart-context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signin } = useContext(CartContext);

    const loginUser = async (e) => {
        e.preventDefault();
        const payload = { email, password }
        try {
            const { data } = await axios.post('http://localhost:3001/api/login', payload)
            signin(data)
            console.log(data)
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
            <h2>Login</h2>
            <form className='ui form' onSubmit={loginUser}>
                <div class="three fields">
                    <div class="field">
                        <label>Your Email</label>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="field">
                        <label>Your Password</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button class="ui button" type="submit">Login</button>
                    <Link to="/register" class="ui button" type="submit">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login