import React from 'react'
import styles from 'styles/components/FormInput.module.css'

interface FormInputProps {
    label: string;
    id: string;
    name: string;
    type: string;
    value: string | number;
    required?: boolean;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string | undefined;
}

const FormInput: React.FC<FormInputProps> = ({ label, id, name, type, value, placeholder, required, onChange, error }) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={name} className={styles.label}>
                {label} {required && <span className={styles.required}>*</span>}
            </label>
            <input
                type={ type }
                id={ id }
                name={ name }
                value={ value }
                placeholder={placeholder}
                onChange={ onChange }
                className={`${styles.input}`}
            />
            { error && <div className={styles.inValidFeedback}>{ error }</div> }
        </div>
    );
};

export default FormInput;