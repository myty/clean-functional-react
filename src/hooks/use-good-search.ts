import { useCallback, useEffect, useReducer } from "react";
import { ArtistSearchResult } from "../models/interfaces/artist-search-result";
import MusicBrainz from "../services/music-brainz";

interface UseSearchOptions {
    offset: number;
    limit: number;
}

interface UseSearchState extends UseSearchOptions {
    artistResults?: ArtistSearchResult;
    searchCalled: boolean;
    searching: boolean;
    searchTerm?: string;
}

type UseSearchAction =
    | { type: "CLEAR_SEARCH" }
    | { type: "FINISH_SEARCH"; searchResult: ArtistSearchResult }
    | { type: "LOAD_NEXT" }
    | { type: "LOAD_PREVIOUS" }
    | { type: "SET_SEARCH"; term: string }
    | { type: "START_SEARCH" }
    | { type: "UPDATE_OPTIONS"; limit: number; offset: number };

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

const defaultState: UseSearchState = {
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    searchCalled: false,
    searching: false,
};

function useSearchStateReducer(
    state: UseSearchState,
    action: UseSearchAction
): UseSearchState {
    switch (action.type) {
        case "CLEAR_SEARCH":
            return {
                ...state,
                artistResults: undefined,
                searching: false,
            };
        case "FINISH_SEARCH":
            return {
                ...state,
                artistResults: action.searchResult,
                searching: false,
            };
        case "LOAD_NEXT":
            return {
                ...state,
                offset: state.limit + state.offset,
                searchCalled: false,
                searching: true,
            };
        case "LOAD_PREVIOUS":
            const offset =
                state.offset < state.limit ? 0 : state.offset - state.limit;

            return {
                ...state,
                offset,
                searchCalled: false,
                searching: true,
            };
        case "SET_SEARCH":
            if (
                action.term == null ||
                action.term.trim() === "" ||
                action.term === state.searchTerm
            ) {
                return state;
            }

            return {
                ...state,
                searchTerm: action.term,
                offset: DEFAULT_OFFSET,
                searchCalled: false,
                searching: true,
            };
        case "START_SEARCH":
            return {
                ...state,
                searchCalled: true,
            };
        case "UPDATE_OPTIONS":
            return {
                ...state,
                limit: action.limit,
                offset: action.offset,
            };
    }
}

export default function useGoodSearch(options?: Partial<UseSearchOptions>) {
    const {
        limit: limitOption = DEFAULT_LIMIT,
        offset: offsetOption = DEFAULT_OFFSET,
    } = options ?? {};

    const [
        { offset, limit, searchTerm, searchCalled, searching, artistResults },
        dispatch,
    ] = useReducer(useSearchStateReducer, undefined, () => ({
        ...defaultState,
        limit: limitOption,
        offset: offsetOption,
    }));

    const hasNext =
        artistResults != null &&
        limit != null &&
        artistResults.count - (artistResults.offset + limit) > 0;

    const hasPrevious = artistResults != null && artistResults.offset > 0;

    const setSearch = useCallback((term?: string) => {
        if (term == null || term.trim() === "") {
            dispatch({ type: "CLEAR_SEARCH" });
            return;
        }

        dispatch({ type: "SET_SEARCH", term });
    }, []);

    const loadSearchResults = useCallback(async () => {
        dispatch({ type: "START_SEARCH" });

        const searchResult = await MusicBrainz.artistSearch(
            searchTerm!,
            offset,
            limit
        );

        dispatch({ type: "FINISH_SEARCH", searchResult });
    }, [limit, offset, searchTerm]);

    useEffect(() => {
        dispatch({
            type: "UPDATE_OPTIONS",
            limit: limitOption,
            offset: offsetOption,
        });
    }, [limitOption, offsetOption]);

    useEffect(() => {
        if (searching && !searchCalled) {
            loadSearchResults();
        }
    }, [loadSearchResults, searchCalled, searching]);

    return {
        hasNext,
        hasPrevious,
        loadNext: () => dispatch({ type: "LOAD_NEXT" }),
        loadPrevious: () => dispatch({ type: "LOAD_PREVIOUS" }),
        results: artistResults,
        searching,
        search: (term?: string) => {
            setSearch(term);
        },
    };
}
