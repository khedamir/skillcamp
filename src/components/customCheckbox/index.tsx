import React from "react";

type CustomCheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  checked,
  onChange,
  label = "Checkbox",
}) => {
  return (
    <div className="checkbox-wrapper-28">
      <input
        id={id}
        type="checkbox"
        className="promoted-input-checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <svg>
        <use xlinkHref="#checkmark-28" />
      </svg>
      <label htmlFor={id}>{label}</label>

      {/* Вставляем иконку только один раз, если её нет на странице */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <symbol id="checkmark-28" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeMiterlimit={10}
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          ></path>
        </symbol>
      </svg>
    </div>
  );
};

export default CustomCheckbox;
