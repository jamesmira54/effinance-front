import { ChangeEventHandler } from "react";

export interface SwitchProps {
    enabled?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    name?: string;
    disabled?: boolean;
    variant?: 'style1' | 'style2' | 'style3' | 'style4';
    id?: string;
}