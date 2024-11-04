import React from 'react';
import styles from 'styles/components/Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    icon,
    className,
    ...props 
  }) => {
    return (
      <button 
        className={`${styles.button} ${styles[variant]} ${className || ''}`} 
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  };

export default Button;