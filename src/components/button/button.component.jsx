import "./button.styles.scss";

/**
 * MARK : BUTTON_TYPES_CLASSES
 * เอาไว้ตรวจสอบว่าปุ่มนี้ควรจะใช้ className ตัวไหนเพราะว่าในเว็บเรา
 * เราจะมีการแบ่งปุ่มออกเป็น 3 รูปแบบ แต่จะ Component เพียงแค่อันเดียว
 */
const BUTTON_TYPES_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonOptions }) => {
  return (
    <button
      className={`button ${
        BUTTON_TYPES_CLASSES[
          buttonOptions.button_style ? buttonOptions.button_style : null
        ]
      }`}
      {...buttonOptions}
    >
      {children}
    </button>
  );
};

export default Button;
