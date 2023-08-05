import React from 'react';
import {useForm, UseFormSetError} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {connect} from "react-redux";
import {getCaptchaUrl, login} from "../../redux/authReducer";
import {Navigate} from "react-router-dom";
import {AppRootStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: any
}

export type LoginFormTypes = {
    email: string
    password: string
    rememberMe: boolean
}
type LoginPropsType = MapStateToPropsType & {
    login: (email: string, password: string, rememberMe: boolean,setError: UseFormSetError<LoginFormTypes>, captcha?:string) => void
    getCaptchaUrl: (captchaUrl: any) => void
}
const Login = ({login, isAuth, captchaUrl}: LoginPropsType) => {

    const loginSchema = yup
        .object({
            email: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols'),
            password: yup.string().required("This Field cant be empty").max(30, 'Maximum 30 symbols').min(6, "Minimum 6 character"),
            rememberMe: yup.boolean().optional().default(false),
            captcha: yup.string().optional()
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    }
        = useForm({resolver: yupResolver(loginSchema)})
    const onSubmit = (data: { email: string, password: string, rememberMe: boolean, captcha: string | undefined}) => {
        login(data.email, data.password, data.rememberMe, setError, data.captcha)

    }
//   setError('email', {type: "serverSideError", message:"bad"})
//             setError("password", {type: "basd"})
    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }

    console.log(errors)
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
const mapPropsToState = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapPropsToState, {login, getCaptchaUrl})(Login)