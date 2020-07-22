import validator from "validator"
import isEmpty from "./is-empty";

export const insertSubcategoryValidation = (data) => {
    let errors = {};

    data.subcategoryName = isEmpty(data.subcategoryName) ? "" : data.subcategoryName
    data.category_id = isEmpty(data.category_id) ? "" : data.category_id
    data.subcategorySlug = isEmpty(data.subcategorySlug) ? "" : data.subcategorySlug
    
    data.subcategoryTitle = isEmpty(data.subcategoryTitle) ? "" : data.subcategoryTitle    
    data.subcategoryDescription = isEmpty(data.subcategoryDescription) ? "" : data.subcategoryDescription    
    data.subcategoryKeyword = isEmpty(data.subcategoryKeyword) ? "" : data.subcategoryKeyword    
    data.subcategoryContent = isEmpty(data.subcategoryContent) ? "" : data.subcategoryContent
    

    if (validator.isEmpty(data.subcategoryName)) {
        errors.subcategoryName = "Please enter the sub category "
    }

    if (validator.isEmpty(data.category_id) && validator.isInt(data.category_id)) {
        errors.category_id = "Please enter the Category Id"
    }

    if (validator.isEmpty(data.subcategorySlug)) {
        errors.subcategorySlug = "Please enter the sub category slug "
    }

    if (validator.isEmpty(data.subcategoryTitle)) {
        errors.subcategoryTitle = "Please enter the sub category "
    }

    if (validator.isEmpty(data.subcategoryDescription)) {
        errors.subcategoryDescription = "Please enter the sub category "
    }

    if (validator.isEmpty(data.subcategoryKeyword)) {
        errors.subcategoryKeyword = "Please enter the sub category "
    }

    if (validator.isEmpty(data.subcategoryContent)) {
        errors.subcategoryContent = "Please enter the sub category "
    }
 
    return { isValid: isEmpty(errors), errors }
}