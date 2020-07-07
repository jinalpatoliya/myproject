import validator from "validator"
import isEmpty from "./is-empty";

export const insertCategoryValidation = (data) => {
    let errors = {};

    data.categoryName = isEmpty(data.categoryName) ? "" : data.categoryName

    if (validator.isEmpty(data.categoryName)) {
        errors.categoryName = "Please enter the Category "
    }
 
    return { isValid: isEmpty(errors), errors }
}