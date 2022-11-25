import "./form-input.styles.scss";

const FormInput = ({ label, inputOptions }) => {
  return (
    <div className="group">
      {label ? (
        <label
          className={`${
            inputOptions.value.length ? "shrink" : null
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      <input className="form-input" {...inputOptions} />
    </div>
  );
};

export default FormInput;
