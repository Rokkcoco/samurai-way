import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
}
const mapPropsToState = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

type LoginPropsType = {
    login: (email: string, password: string, rememberMe: boolean) => void
    isAuth: boolean
}
const Login = ({login, isAuth}:LoginPropsType) => {

    const loginSchema = yup
        .object({
            email: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols'),
            password: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols').min(6, "Minimum 6 character"),
            rememberMe: yup.boolean().optional().default(false)
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    }
        = useForm({resolver: yupResolver(loginSchema)})
    const onSubmit = (data: {email: string, password: string, rememberMe: boolean}) => {
        console.log(data)
        login(data.email, data.password, data.rememberMe)
        reset()
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>LOGIN</h1>
            <div>
                <input {...register("email")} placeholder={"Email"}/>
                <p>{errors.email?.message}</p>
            </div>
            <div>
                <input {...register("password")} type={"password"} placeholder={"Password"}/>
                <p>{errors.password?.message}</p>
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


export default connect(mapPropsToState, {login})(Login)