import App from "App";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import "@testing-library/jest-dom";
import { ArtistSearchResult } from "models/interfaces/artist-search-result";
import { ArtistSearchResultFactory } from "models/factories/artist-search-result-factory";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
    window.history.pushState({}, "Test page", route);

    return render(ui, { wrapper: BrowserRouter });
};

let hasNext: boolean = false;
let results: ArtistSearchResult;
let searching: boolean = false;

jest.mock("../hooks/use-good-search", () => {
    return jest.fn(() => ({
        hasNext,
        hasPrevious: true,
        loadNext: jest.fn(),
        loadPrevious: jest.fn(),
        results,
        search: jest.fn(),
        searching,
    }));
});

describe("GoodPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders", () => {
        // Arrange & Act
        const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

        // Assert
        expect(getByTestId("artist-search")).toBeTruthy();
    });

    test("when hook returns no results, artist results section is not displayed", () => {
        // Arrange
        results = ArtistSearchResultFactory.create({
            artistCount: 0,
            offset: 0,
            totalCount: 0,
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
        results = ArtistSearchResultFactory.create({
            artistCount: 1,
            offset: 0,
            totalCount: 1,
        });

        // Act
        const { getByTestId } = renderWithRouter(<App />, { route: "/good" });

        // Assert
        expect(getByTestId("artist-search")).toHaveTextContent(
            "Artist Results"
        );
    });
});
