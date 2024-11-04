import React, { useState, useRef, useEffect } from 'react';
import styles from 'styles/components/FormSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  onChange,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      
      <div 
        className={`${styles.select} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedValue}>
          <span className={styles.dot}></span>
          {selectedOption?.label || 'Select an option'}
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSelect;