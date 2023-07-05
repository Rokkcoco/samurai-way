import React from 'react';
import {useForm} from "react-hook-form";


const Login = () => {

    const {register, handleSubmit} = useForm()
    const onSubmit = (d: any) => {
        console.log(d)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>LOGIN</h1>
            <div>
                <input {...register("login")} placeholder={"Login"}/>
            </div>
            <div>
                <input {...register("password")} placeholder={"Password"}/>
            </div>
            <div>
                <input  {...register("rememberMe")} type={"checkbox"}/>remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};


export default Login;