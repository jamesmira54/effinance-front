import { styled } from "styled-components";
import { ButtonProps } from "./types";


const StyledButton = styled.button<any>`
    display: flex;
    gap: 5px;
    ${(props) => 
      props.$variants === 'outlined' ?
        `background-color: transparent;`
        : props.$variants === 'text' ?
          `background-color: transparent; 
          padding: 0px;`
          : ''
    }
`;
  

const Button: React.FC<ButtonProps> = ({ 
  startIcon: StartIcon, 
  endIcon: EndIcon, 
  children, 
  className = "", 
  variants = "default",
  ...props 
}) => {
    return (
      <StyledButton
        className={`inline-flex items-center justify-center rounded-md text-center font-medium 
          ${variants === 'default' ? "text-white" : variants === 'outlined' ?  "text-black dark:text-white hover:text-primary"  : "text-black dark:text-white hover:text-primary" }  
          hover:bg-opacity-90 py-4 lg:px-8 xl:px-10 
          ${className}`}
        $variants={variants}
        {...props}
      >
        {StartIcon}  
        {children}  
        {EndIcon}
      </StyledButton>
    );
};
  
export default Button;