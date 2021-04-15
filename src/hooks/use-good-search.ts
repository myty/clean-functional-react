import { useCallback, useEffect, useReducer } from "react";
import MusicBrainz, {
    MusicBrainzArtistSearchResult,
} from "../services/music-brainz";

interface UseSearhOptions {
    offset?: number;
    limit?: number;
}

interface UseSearchState {
    artistResults?: MusicBrainzArtistSearchResult;
    hasNext: boolean;
    hasPrevious: boolean;
    limit: number;
    offset: number;
    searchCalled: boolean;
    searching: boolean;
    searchTerm?: string;
}

type UseSearchAction =
    | { type: "UPDATE_OPTIONS"; limit?: number; offset?: number }
    | { type: "CLEAR_SEARCH" }
    | { type: "LOAD_NEXT" }
    | { type: "LOAD_PREVIOUS" }
    | { type: "SET_SEARCH"; term: string }
    | { type: "START_SEARCH" }
    | { type: "FINISH_SEARCH"; searchResult: MusicBrainzArtistSearchResult };

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

function useSearchStateReducer(
    state: UseSearchState,
    action: UseSearchAction
): UseSearchState {
    switch (action.type) {
        case "UPDATE_OPTIONS":
            return calculationsAndDefaults({
                ...state,
                limit: action.limit,
                offset: action.offset,
            });
        case "CLEAR_SEARCH":
            return calculationsAndDefaults({
                ...state,
                artistResults: undefined,
                searching: false,
            });
        case "LOAD_NEXT":
            return calculationsAndDefaults({
                ...state,
                offset: state.limit + state.offset,
                searchCalled: false,
                searching: true,
            });
        case "LOAD_PREVIOUS":
            const offset =
                state.offset < state.limit ? 0 : state.offset - state.limit;

            return calculationsAndDefaults({
                ...state,
                offset,
                searchCalled: false,
                searching: true,
            });
        case "SET_SEARCH":
            if (
                action.term == null ||
                action.term.trim() === "" ||
                action.term === state.searchTerm
            ) {
                return state;
            }

            return calculationsAndDefaults({
                ...state,
                searchTerm: action.term,
                searchCalled: false,
                searching: true,
            });
        case "START_SEARCH":
            return {
                ...state,
                searchCalled: true,
            };
        case "FINISH_SEARCH":
            return calculationsAndDefaults({
                ...state,
                artistResults: action.searchResult,
                searching: false,
            });
    }
}

const defaultState: UseSearchState = {
    hasNext: false,
    hasPrevious: false,
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET,
    searchCalled: false,
    searching: false,
};

const calculationsAndDefaults = (
    state?: Omit<Partial<UseSearchState>, "hasNext" | "hasPrevious">
) => {
    const hasNext =
        state?.artistResults != null &&
        state?.limit != null &&
        state.artistResults.count - (state.artistResults.offset + state.limit) >
            0;

    const hasPrevious =
        state?.artistResults != null && state?.artistResults.offset > 0;

    return {
        ...defaultState,
        ...state,
        hasNext,
        hasPrevious,
    };
};

export default function useGoodSearch(options?: UseSearhOptions) {
    const {
        limit: limitOption = DEFAULT_LIMIT,
        offset: offsetOption = DEFAULT_OFFSET,
    } = options ?? {};

    const [
        {
            offset,
            limit,
            searchTerm,
            searchCalled,
            searching,
            artistResults,
            hasNext,
            hasPrevious,
        },
        dispatch,
    ] = useReducer(useSearchStateReducer, undefined, () =>
        calculationsAndDefaults({
            limit: limitOption,
            offset: offsetOption,
        })
    );

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
