import validator from "validator"
import isEmpty from "./is-empty";

export const insertSignupValidation = (data) => {
    let errors = {};

    data.name = isEmpty(data.name) ? "" : data.name
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password


    if (validator.isEmpty(data.name)) {
        errors.name = "Please enter the Name "
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Please enter the Email "
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Please enter password "
    }
 
    return { isValid: isEmpty(errors), errors }
}