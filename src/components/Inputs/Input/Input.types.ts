import { ChangeEventHandler, CSSProperties, ReactChild, ReactNode } from "react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type?:
    | 'email'
    | 'file'
    | 'hidden'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'date';
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: any;
  name?: string;
  placeholder?: string;
  minLength?: number;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
}

export interface InputProps extends Omit<InputFieldProps, 'size'> {
  style?: CSSProperties;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  id?: string;
  errorMessage?: string;
  label?: string;
  variant?: 'style1' | 'style2';
  className?: string;
  onBlur?: () => void;
}