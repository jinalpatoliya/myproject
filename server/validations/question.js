import validator from "validator"
import isEmpty from "./is-empty";

export const insertQuestionValidation = (data) => {
    let errors = {};

    data.question = isEmpty(data.question) ? "" : data.question
    data.optionA = isEmpty(data.optionA) ? "" : data.optionA
    data.optionB = isEmpty(data.optionB) ? "" : data.optionB
    data.optionC = isEmpty(data.optionC) ? "" : data.optionC
    data.optionD = isEmpty(data.optionD) ? "" : data.optionD

    if (validator.isEmpty(data.question)) {
        errors.question = "Please enter the question"
    }

    if (validator.isEmpty(data.optionA)) {
        errors.optionA = "Please enter the optionA"
    }

    if (validator.isEmpty(data.optionB)) {
        errors.optionB = "Please enter the optionB"
    }

    if (validator.isEmpty(data.optionC)) {
        errors.optionC = "Please enter the optionC"
    }

    if (validator.isEmpty(data.optionD)) {
        errors.optionD = "Please enter the optionD"
    }
    return { isValid: isEmpty(errors), errors }
}