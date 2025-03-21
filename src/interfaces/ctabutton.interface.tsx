interface ActionButtonProps {
    text: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}