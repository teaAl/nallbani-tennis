import { useEffect, useState } from "react";

export function useIsVisible(ref: React.RefObject<HTMLElement | null>) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting)
        }
        );

        if (ref && ref.current)
            observer.observe(ref.current);
        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
};