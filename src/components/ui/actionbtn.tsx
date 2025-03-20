const ActionButton = ({ text }: { text: string }) => {
    return (
        <button className="bg-gray-900 hover:bg-pear text-pear hover:text-gray-900 w-full font-bold py-2 px-4 rounded shadow-lg cursor-pointer transition-all duration-300">
            <span>{text}</span>
        </button>
    );
}

export default ActionButton;