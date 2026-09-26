import "../css/customButtons.css";

export const QuickActionButton = ({ icon, name, color, fnc }) => {
  return (
    <button className="quick-action" onClick={fnc}>
      <span className={color}>{icon}</span>
      <strong>{name}</strong>
    </button>
  );
};

export const InputButton = ({ text, style, fnc }) => {
  return (
    <button
      type="button"
      onClick={(e) => fnc(e)}
      className={`transaction-type ${style}`}
      value={text}
    >
      {text}
    </button>
  );
};

export const CheckButton = ({ value, fnc, label }) => {
  return (
    <div className="check">
      <input
        onChange={fnc}
        type="checkbox"
        className="check__check"
        checked={value}
        value={label}
        id={label}
      />
      <div className="check__indicator" />
    </div>
  );
};
