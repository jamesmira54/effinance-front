import React, { ChangeEvent, ForwardedRef, Fragment, useEffect, useState } from "react";
import { InputProps } from "./Input.types";
import { styled } from "styled-components";
import flatpickr from "flatpickr";


const StyledInput = styled.input<any>`
    border-radius: 4px;
`;

const Input: React.FC<InputProps> = React.forwardRef(
    (
        {
        style,
        startIcon,
        endIcon,
        id,
        error = false,
        errorMessage = '',
        type = 'text',
        disabled = false,
        onChange,
        value,
        name = '',
        placeholder = '',
        max,
        min,
        minLength,
        readOnly = false,
        required = false,
        label = '',
        variant = 'style1',
        className,
        onBlur,
        ...props
        },
        ref?: ForwardedRef<HTMLDivElement>
    ) => {

        const [inputValue, setInputValue] = useState(value || '');

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setInputValue(event.target.value);
    
            if (onChange) {
                onChange(event);
            }
        };


        return (
            <div className="input-wrapper">
                <label className="mb-2.5 block text-sm font-medium text-black dark:text-white"> {label} </label>
                <div ref={ref} className="relative">
                    <div className="absolute left-3 top-4">
                        {startIcon && startIcon} 
                        {required && <span className="text-meta-1">*</span>}
                    </div>
                    <StyledInput
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        className={`
                            w-full rounded-lg border border-stroke bg-transparent py-2 
                            ${variant === 'style1' ? 'pl-4 pr-10' : 'pl-10 pr-4'} 
                            pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary 
                            ${type === 'date' && 'form-datepicker'} 
                            ${className}`}
                        style={style}
                        disabled={disabled}
                        onChange={handleChange}
                        value={inputValue}
                        name={name}
                        max={max}
                        min={min}
                        minLength={minLength}
                        readOnly={readOnly}
                        required={required}
                        autoComplete="off"
                        {...props}
                        data-class={`${type === 'date' && 'flatpickr-right'}`}
                        onBlur={onBlur}
                    />

                    <div className="absolute right-3 top-2.5">
                        {endIcon && endIcon}
                    </div>
                </div>
                {error && <p className="text-meta-1">{errorMessage}</p>}
            </div>
        );
    }
);


export default Input;