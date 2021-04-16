import { renderHook, act } from "@testing-library/react-hooks";
import MusicBrainz from "../services/music-brainz";
import useGoodSearch from "./use-good-search";
import faker from "faker";
import { ArtistSearchResultFactory } from "../models/factories/artist-search-result-factory";

const setupMocks = ({
    limit = 1,
    offset = 0,
    totalCount = 1,
}: {
    limit?: number;
    offset?: number;
    totalCount?: number;
} = {}) => {
    const value = ArtistSearchResultFactory.create({
        artistCount: totalCount,
        offset: offset,
        totalCount: totalCount,
    });

    const mockedArtistSearch = jest
        .spyOn(MusicBrainz, "artistSearch")
        .mockResolvedValue(value);

    return { limit, mockedArtistSearch, offset, totalCount };
};

describe("useGoodSearch", () => {
    beforeEach(() => jest.clearAllMocks());

    test("initialization", () => {
        // Arrange & Act
        const { result } = renderHook(() => useGoodSearch());

        // Assert
        expect(result.current).toMatchSnapshot();
    });

    describe("search()", () => {
        test("when no search term, it returns no results", () => {
            // Arrange
            const { result } = renderHook(() => useGoodSearch());

            // Act
            act(() => {
                result.current.search();
            });

            // Assert
            expect(result.current.results).toBeUndefined();
        });

        test("when empty search term, it returns no results", () => {
            // Arrange
            const { result } = renderHook(() => useGoodSearch());

            // Act
            act(() => {
                result.current.search("");
            });

            // Assert
            expect(result.current.results).toBeUndefined();
        });

        test("when search term not empty, returns results", async () => {
            // Arrange
            setupMocks();
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch()
            );

            // Act
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Assert
            expect(result.current.results).toBeDefined();
        });

        test("when search term is same as previous search term, makes no state changes", async () => {
            // Arrange
            const { mockedArtistSearch } = setupMocks();
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch()
            );
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            const lastState = result.current;

            // Act
            act(() => result.current.search("name"));

            // Assert
            expect(mockedArtistSearch).toBeCalledTimes(1);
            expect(result.current.results).toEqual(lastState.results);
        });

        test("when offset > 0, hasPrevious is true", async () => {
            // Arrange
            setupMocks({ offset: 1, totalCount: 2 });
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch()
            );

            // Act
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Assert
            expect(result.current.hasPrevious).toBe(true);
        });

        test("when count > limit + offset, hasNext is true", async () => {
            // Arrange
            const { limit, offset } = setupMocks({
                limit: 1,
                offset: 1,
                totalCount: 3,
            });
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch({ limit, offset })
            );

            // Act
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Assert
            expect(result.current.hasNext).toBe(true);
        });
    });

    describe("next()", () => {
        test("when called, search is called with offset incremented by the limit", async () => {
            // Arrange
            const limit = faker.datatype.number({ min: 1, max: 25 });
            const { mockedArtistSearch, offset } = setupMocks({
                limit: limit,
                offset: 0,
                totalCount: limit + 2,
            });
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch({ limit, offset })
            );
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Act
            act(() => result.current.loadNext());
            await waitForNextUpdate();

            // Assert
            expect(mockedArtistSearch).lastCalledWith("name", limit, limit);
        });
    });

    describe("previous()", () => {
        test("when called, search is called with offset decremented by the limit", async () => {
            // Arrange
            const limit = faker.datatype.number({ min: 1, max: 25 });
            const { mockedArtistSearch, offset } = setupMocks({
                limit: limit,
                offset: limit,
                totalCount: limit + 2,
            });
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch({ limit, offset })
            );
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Act
            act(() => result.current.loadPrevious());
            await waitForNextUpdate();

            // Assert
            expect(mockedArtistSearch).lastCalledWith("name", 0, limit);
        });

        test("when called with offset greater than zero and less than the limit, search is called with offset equal to zero", async () => {
            // Arrange
            const limit = 25;
            const offset = 2;
            const { mockedArtistSearch } = setupMocks({
                limit: limit,
                offset: offset,
                totalCount: limit + 2,
            });
            const { result, waitForNextUpdate } = renderHook(() =>
                useGoodSearch({ limit, offset })
            );
            act(() => result.current.search("name"));
            await waitForNextUpdate();

            // Act
            act(() => result.current.loadPrevious());
            await waitForNextUpdate();

            // Assert
            expect(mockedArtistSearch).lastCalledWith("name", 0, limit);
        });
    });
});
