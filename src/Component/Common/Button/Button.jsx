import "./button.css";
/*
 * Components : Button
 * Props :
 *      type:string,
 *      text:string,
 *      disabled:boolen,
 *      theme:string,
 *      padding:string,
 *      fontSize:string,
 *      fontWeight:string,
 *      bgcolor:string,
 * Button Types : Primary, Secondary and tertiary
 * Button Variants : contained, outlined and text
 *
 */
export const Button = ({
    buttonType,
    buttonVariant,
    padding,
    margin,
    width,
    minWidth,
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
                    /*  fill="#fff" */
                    xmlns="http://www.w3.org/2000/svg"
                    className="btn-spinner"
                >
                    <path
                        d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                        /*    fill="#ffffff" */
                    />
                    <path
                        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                        /* fill="#ffffff" */
                    />
                </svg>
            ) : (
                text
            )}
        </button>
    );
};
Button.defaultProps = {
    text: "Click Here !",
    buttonType: "primary",
    buttonVariant: "contained",
    type: "button",
    width: "100%",
    disabled: false,
    form: "",
    isLoading: false,
};
