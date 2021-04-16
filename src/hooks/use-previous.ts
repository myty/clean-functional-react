import { useEffect, useRef } from "react";

export default function usePrevious<T = any>(value?: T): T | undefined {
    const previousValue = useRef<T>();

    useEffect(() => {
        previousValue.current = value;
    }, [value]);

    return previousValue.current;
}
