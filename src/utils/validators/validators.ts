import * as yup from "yup"


const Schema = yup
    .object({
        firstName: yup.string().required(),
        age: yup.number().positive().integer().required(),
    })
    .required()

export const requiredField = (value:any) => {
    if (value )return undefined
    return "Field is required"
}