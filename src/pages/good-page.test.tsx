import App from "App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ArtistSearchResultFactory } from "models/factories/artist-search-result-factory";
import * as useGoodSearch from "hooks/use-good-search";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(ui, { wrapper: BrowserRouter });
};

const defaultUseGoodSearchImplementation: ReturnType<
    typeof useGoodSearch.default
> = {
    hasNext: false,
    hasPrevious: true,
    loadNext: jest.fn(),
    loadPrevious: jest.fn(),
    results: undefined,
    search: jest.fn(),
    searching: false,
};

const useGoodSearchSpy = jest.spyOn(useGoodSearch, "default");

describe("GoodPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders", () => {
        // Arrange
        useGoodSearchSpy.mockReturnValue(defaultUseGoodSearchImplementation);

        // Act
        const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

        // Assert
        expect(getByTestId("artist-search")).toBeTruthy();
    });

    test("when hook returns no results, artist results section is not displayed", () => {
        // Arrange
        useGoodSearchSpy.mockReturnValue({
            ...defaultUseGoodSearchImplementation,
            results: ArtistSearchResultFactory.create({
                artistCount: 0,
                offset: 0,
                totalCount: 0,
            }),
        });

        // Act
        const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

        // Assert
        expect(getByTestId("artist-search")).not.toHaveTextContent(
            "Artist Results"
        );
    });

    test("when hook returns results, artist results section is displayed", () => {
        // Arrange
        useGoodSearchSpy.mockReturnValue({
            ...defaultUseGoodSearchImplementation,
            results: ArtistSearchResultFactory.create({
                artistCount: 1,
                offset: 0,
                totalCount: 1,
            }),
        });

        // Act
        const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

        // Assert
        expect(getByTestId("artist-search")).toHaveTextContent(
            "Artist Results"
        );
    });
});
