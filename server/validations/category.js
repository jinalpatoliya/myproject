import validator from "validator"
import isEmpty from "./is-empty";

export const insertCategoryValidation = (data) => {
    let errors = {};

    data.categoryName = isEmpty(data.categoryName) ? "" : data.categoryName
    data.categorySlug = isEmpty(data.categorySlug) ? "" : data.categorySlug
    data.categoryTitle = isEmpty(data.categoryTitle) ? "" : data.categoryTitle
    data.categoryDescription = isEmpty(data.categoryDescription) ? "" : data.categoryDescription
    data.categoryKeyword = isEmpty(data.categoryKeyword) ? "" : data.categoryKeyword
    data.categoryContent = isEmpty(data.categoryContent) ? "" : data.categoryContent
    
    if (validator.isEmpty(data.categoryName)) {
        errors.categoryName = "Please enter the Category "
    }
 
    if (validator.isEmpty(data.categorySlug)) {
        errors.categorySlug = "Please enter the Category "
    }

    if (validator.isEmpty(data.categoryTitle)) {
        errors.categoryTitle = "Please enter the Category "
    }

    if (validator.isEmpty(data.categoryDescription)) {
        errors.categoryDescription = "Please enter the Category "
    }

    if (validator.isEmpty(data.categoryContent)) {
        errors.categoryContent = "Please enter the Category "
    }

    if (validator.isEmpty(data.categoryKeyword)) {
        errors.categoryKeyword = "Please enter the Category "
    }
    return { isValid: isEmpty(errors), errors }
}