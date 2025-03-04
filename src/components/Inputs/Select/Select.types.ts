import { CSSProperties, ReactNode } from "react";

export type SelectOption = {
    value: string;
    label: string;
};

export interface SelectProps {
    className?: string;
    name?: string;
    value?: SelectOption | null;
    options?: SelectOption[];
    disabled?: boolean;
    style?: CSSProperties;
    startIcon?: ReactNode;
    id?: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    noOptionsMessage?: ReactNode | string;
    isMultiple?: boolean;
    onChange: (selectedOption: SelectOption | null) => void;
    maxSelect?: number;
    readOnly?: boolean;
    label?: string;
    placeholder?: string;
}