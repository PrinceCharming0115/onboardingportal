import React from 'react';
import styles from 'styles/components/FormCheckbox.module.css';

interface FormCheckboxProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, id, name, checked, onChange, error }) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={styles.input}
                />
                {label}
            </label>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default FormCheckbox;