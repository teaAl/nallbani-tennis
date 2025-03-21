
const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    variant = "primary",
    onClick,
    size =
    "md",
    disabled = false,
}) => {

    const variantStyles = {
        primary: "bg-gray-900 hover:bg-pear text-pear hover:text-gray-900",
        secondary: "bg-pear hover:bg-gray-900 text-gray-900 hover:text-pear border border-pear",
        outline: "border border-pear text-pear hover:bg-pear hover:text-gray-900",
        ghost: "bg-transparent text-pear hover:bg-pear/10",
    };

    const sizeStyles = {
        sm: "text-sm py-1 px-2",
        md: "text-md py-2 px-4",
        lg: "text-lg py-3 px-6",
    };

    return (
        <button className={`"w-full font-bold rounded shadow-lg cursor-pointer transition-all duration-300
            ${variantStyles[variant]}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${sizeStyles[size]}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            <span>{text}</span>
        </button>
    );
}

export default ActionButton;