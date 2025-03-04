export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    startIcon?:React.ReactNode;
    endIcon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    variants?: 'default' | 'outlined' | 'text';
}