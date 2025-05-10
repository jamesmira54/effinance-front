import { CSSProperties, ReactNode } from "react";

export type SelectOption = {
    value: string;
    label: string;
};

export type SelectOption2 = {
    value: any;
    label: string;
};


export interface SelectProps {
    className?: string;
    name?: string;
    value?: SelectOption | SelectOption[] | SelectOption2 | null;
    options?: SelectOption[] | SelectOption2;
    disabled?: boolean;
    style?: CSSProperties;
    startIcon?: ReactNode;
    id?: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    noOptionsMessage?: ReactNode | string;
    isMultiple?: boolean;
    onChange: (selectedOption: SelectOption | SelectOption2 | null) => void;
    maxSelect?: number;
    readOnly?: boolean;
    label?: string;
    placeholder?: string;
    isLoading?: boolean;
    onBlur?: () => void;
}