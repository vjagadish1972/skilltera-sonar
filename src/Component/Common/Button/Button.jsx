import PropTypes from "prop-types";
import "./button.css";

export const Button = ({
    buttonType,
    buttonVariant,
    padding,
    margin,
    width,
    fontsize,
    fontweight,
    bgcolor,
    type,
    text,
    disabled,
    height,
    onClick,
    form,
    isLoading,
}) => {
    return (
        <button
            className={`st-button ${buttonType} ${buttonVariant}`}
            style={{
                width: width,
                height: height,
                padding: padding,
                margin: margin,
                fontSize: fontsize,
                fontWeight: fontweight,
                backgroundColor: bgcolor,
            }}
            type={type}
            disabled={isLoading ? true : disabled}
            onClick={onClick}
            form={form}
        >
            {isLoading ? (
                <svg
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="btn-spinner"
                >
                    <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                </svg>
            ) : (
                text
            )}
        </button>
    );
};

// Default props
Button.defaultProps = {
    text: "Click Here!",
    buttonType: "primary",
    buttonVariant: "contained",
    type: "button",
    width: "100%",
    disabled: false,
    form: "",
    isLoading: false,
};

// Prop validation using PropTypes
Button.propTypes = {
    buttonType: PropTypes.string,
    buttonVariant: PropTypes.string,
    padding: PropTypes.string,
    margin: PropTypes.string,
    width: PropTypes.string,
    fontsize: PropTypes.string,
    fontweight: PropTypes.string,
    bgcolor: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    text: PropTypes.string.isRequired,  // Validation for text prop
    disabled: PropTypes.bool,
    height: PropTypes.string,
    onClick: PropTypes.func,
    form: PropTypes.string,
    isLoading: PropTypes.bool,
};
