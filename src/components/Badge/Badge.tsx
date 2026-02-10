import { BadgeProps } from "./Badge.types";

const Badge: React.FC<BadgeProps> = ({ children, variants }) => {
    const color = variants === 'default' ? "bg-primary text-white" : 
                  variants === 'success' ? "bg-success text-white" : 
                  variants === 'error' ? "bg-danger text-white" : 
                  variants === 'warning' ? "bg-warning text-yellow-800" : "";

    return (
        <span 
            className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-xs text-center ${color}`}
        >  
            {children}
        </span>
    );
}

export default Badge;