import validator from "validator"
import isEmpty from "./is-empty";

export const insertMainCategoryValidation = (data) => {
    let errors = {};

    data.mainCategoryName = isEmpty(data.mainCategoryName) ? "" : data.mainCategoryName
    data.mainCategorySlug = isEmpty(data.mainCategorySlug) ? "" : data.mainCategorySlug
    data.mainCategoryTitle = isEmpty(data.mainCategoryTitle) ? "" : data.mainCategoryTitle

    if (validator.isEmpty(data.mainCategoryName)) {
        errors.mainCategoryName = "Please enter the main Category "
    }
 
    if (validator.isEmpty(data.mainCategorySlug)) {
        errors.mainCategorySlug = "Please enter the main Category slug"
    }

    if (validator.isEmpty(data.mainCategoryTitle)) {
        errors.mainCategoryTitle = "Please enter  the main Category title"
    }
    return { isValid: isEmpty(errors), errors }
}