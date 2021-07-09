import App from "App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as useGoodSearch from "hooks/use-good-search";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(ui, { wrapper: BrowserRouter });
};

test("renders", () => {
    // Arrange
    jest.spyOn(useGoodSearch, "default").mockReturnValue({
        hasNext: false,
        hasPrevious: true,
        loadNext: jest.fn(),
        loadPrevious: jest.fn(),
        results: undefined,
        search: jest.fn(),
        searching: false,
    });

    // Act
    const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

    // Assert
    expect(getByTestId("artist-search")).toBeTruthy();
});
