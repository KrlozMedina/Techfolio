import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, id, ...props }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} value={value} onChange={onChange} {...props} />
  </div>
);

export { TextInput };
