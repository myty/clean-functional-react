import { renderHook } from "@testing-library/react-hooks";
import usePrevious from "./use-previous";

describe("usePrevious", () => {
    test("initial value is undefined", () => {
        // Arrange & Act
        const { result } = renderHook(() => usePrevious());

        // Assert
        expect(result.current).toBeUndefined();
    });

    test("new value returns previous value", () => {
        // Arrange
        const expectedResult = 10;
        const { result, rerender } = renderHook<any, any>(
            (value) => usePrevious(value),
            { initialProps: expectedResult }
        );

        // Act
        rerender(20);

        // Assert
        expect(result.current).toBe(expectedResult);
    });

    test("any new value returns previous value", () => {
        // Arrange
        const expectedResult = 20;
        const { result, rerender } = renderHook<any, any>(
            (value) => usePrevious(value),
            { initialProps: 10 }
        );

        // Act
        rerender(expectedResult);
        rerender(30);

        // Assert
        expect(result.current).toBe(expectedResult);
    });
});
