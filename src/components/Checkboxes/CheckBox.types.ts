export interface CheckBoxProps {
    id?: string;
    label?: string;
    isChecked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    className?: string;
    disabled?: boolean;
    isIndeterminate?: boolean;
    style?: 'default' | 'rounded' | 'circle' | 'square';
}