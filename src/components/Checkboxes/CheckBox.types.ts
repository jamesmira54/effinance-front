export interface CheckBoxProps {
    // id?: string;
    name?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    style?: 'default' | 'square' | 'x-sign' | 'inner-circle' | 'outer-circle';
}