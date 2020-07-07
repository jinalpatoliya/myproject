import validator from "validator"
import isEmpty from "./is-empty";

export const insertMainCategoryMappingValidation = (dataItem) => {
    let errors = {};
    dataItem.map((data)=>{
    data.main_category_id = isEmpty(data.main_category_id) ? "" : data.main_category_id
    data.category_id = isEmpty(data.category_id) ? "" : data.category_id    
 
    if (validator.isNumeric(data.main_category_id)) {
        errors.main_category_id = "Please enter the main Category Id"
    }

    if ( validator.isNumeric(data.category_id)) {
        errors.category_id = "Please enter  the  Category Id"
    }
    return { isValid: isEmpty(errors), errors }
})
}