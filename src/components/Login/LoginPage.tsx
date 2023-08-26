import React from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/redux-store";
import {selectCaptchaUrl, selectIsAuth} from "../../redux/login-selectors";

export type LoginFormTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

export const LoginPage = () => {

    const captchaUrl = useAppSelector(selectCaptchaUrl)
    const isAuth = useAppSelector(selectIsAuth)
    const dispatch = useAppDispatch()

    const loginSchema = yup
        .object({
            email: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols'),
            password: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols').min(6, "Minimum 6 character"),
            rememberMe: yup.boolean().optional().default(false),
            captcha: yup.string().optional().nullable().default(null)
        })
        .required()

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    }
        = useForm({resolver: yupResolver(loginSchema)})
    const onSubmit = (data: LoginFormTypes) => {
        dispatch(login(data.email, data.password, data.rememberMe, setError, data.captcha))
    }

    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>LOGIN</h1>
            <div>
                <input {...register("email")} placeholder={"Email"}/>
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <input {...register("password")} type={"password"} placeholder={"Password"}/>
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <input  {...register("rememberMe")} type={"checkbox"}/>remember me
                {captchaUrl && <img src={captchaUrl}/>}
                {captchaUrl && <input type="text" {...register("captcha")}/>}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};
