import "../css/dropdown.css";
import { MdKeyboardArrowDown } from "react-icons/md";

const CustomDropdown = ({ icon, options, fnc, category }) => {
  return (
    <div className="select-wrapper">
      {icon}
      <select
        name="selector"
        onChange={(e) => fnc(e)}
        className="select-input"
        defaultValue={category ? category : ""}
        required
      >
        {options.length !== 0 && options[0].type ? (
          <option value="">Select a Category</option>
        ) : (
          ""
        )}
        {options.length !== 0 &&
          options.map((option, idx) => (
            <option key={idx} value={option.value} disabled={option.disabled}>
              {option.label ? option.label : option.value}
            </option>
          ))}
      </select>
      <label htmlFor="selector">
        <MdKeyboardArrowDown />
      </label>
    </div>
  );
};

export const Selector = ({ options, fnc, selectedVal }) => {
  return (
    <div className="select-wrapper">
      <div className={`box ${selectedVal}`}></div>
      <select
        name="selector"
        onChange={(e) => fnc(e)}
        className="select-input"
        defaultValue={selectedVal}
        required
      >
        {options.length !== 0 &&
          options.map((item, idx) => (
            <option className={item} key={idx} value={item}>
              {item}
            </option>
          ))}
      </select>
      <label htmlFor="selector">
        <MdKeyboardArrowDown />
      </label>
    </div>
  );
};

export default CustomDropdown;
