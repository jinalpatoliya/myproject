import validator from "validator"
import isEmpty from "./is-empty";

export const insertSubcategoryValidation = (data) => {
    let errors = {};

    data.subcategoryName = isEmpty(data.subcategoryName) ? "" : data.subcategoryName
    data.category_id = isEmpty(data.category_id) ? "" : data.category_id
    data.subcategorySlug = isEmpty(data.subcategorySlug) ? "" : data.subcategorySlug
    
    if (validator.isEmpty(data.subcategoryName)) {
        errors.subcategoryName = "Please enter the sub category "
    }

    if (validator.isEmpty(data.category_id) && validator.isInt(data.category_id)) {
        errors.category_id = "Please enter the Category Id"
    }

    if (validator.isEmpty(data.subcategorySlug)) {
        errors.subcategorySlug = "Please enter the sub category slug "
    }
 
    return { isValid: isEmpty(errors), errors }
}