import { ForwardedRef, useEffect, useState } from "react"
import { CheckBoxProps } from "./CheckBox.types"
import React from "react"
import { FaCheck, FaRegCircle, FaSquare, FaCircle } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const CheckBox: React.FC<CheckBoxProps> = React.forwardRef(
    (
        {
        style='default',
        name,
        value,
        disabled = false,
        onChange,
        checked,
        // id = '',
        label = '',
        className = '',
        onBlur,
        ...props
        },
        ref?: ForwardedRef<HTMLDivElement>
    ) => {

        const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

        const id = `${name}-checkbox`;
         // ✅ sync prop to state
        useEffect(() => {
            setIsChecked(checked ?? false);
        }, [checked]);


        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = e.target.checked;
            setIsChecked(newChecked);
            onChange(newChecked);
        };


        return (
            <div ref={ref} {...props}>
                <label htmlFor={id}  className="flex cursor-pointer select-none items-center peer-checked:bg-blue-500 peer-checked:text-white transition" >
                    <div className="relative">
                        <input
                            type="checkbox"
                            id={id}
                            name={name}
                            value={value}
                            className="peer hidden"
                            checked={isChecked}
                            onChange={handleChange}
                            onBlur={onBlur}
                        />
                    <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                            isChecked && "border-primary bg-gray dark:bg-transparent"
                        }`}
                    >
                        <span className={`opacity-0 ${isChecked && "!opacity-100"}`}>
                            {style === 'default' ?
                                <FaCheck className="text-primary" size={12} />
                            : style === 'square' ? 
                                <FaSquare className="text-primary" size={12} />
                            : style === 'x-sign' ?
                                <IoCloseOutline className="text-primary" size={12} />
                            :   style === 'inner-circle' ?
                                <FaRegCircle className="text-primary" size={12} />
                            :
                                <FaCircle className="text-primary" size={12} />
                            }
                        </span>
                    </div>
                    </div>
                    {label}
                </label>
            </div>
        )
    }
)


export default CheckBox;