import { useState, useCallback } from 'react';

function useFormValidation() {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleChange = ({ target }) => {

        const { name, value } = target;

        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: target.validationMessage
        });
        setIsValid(target.closest("form").checkValidity());
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values,
        setValues,
        errors,
        isValid,
        setIsValid,
        handleChange,
        resetForm,
    };
}

export default useFormValidation;
