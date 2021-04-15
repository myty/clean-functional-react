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
    searchTerm?: string;
    searching: boolean;
}

type UseSearchAction =
    | { type: "UPDATE_OPTIONS"; limit?: number; offset?: number }
    | { type: "CLEAR_SEARCH" }
    | { type: "START_SEARCH"; term: string; offset?: number }
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
        case "START_SEARCH":
            if (
                action.term == null ||
                action.term.trim() === "" ||
                action.term === state.searchTerm
            ) {
                return state;
            }

            return calculationsAndDefaults({
                ...state,
                offset: action.offset,
                searchTerm: action.term,
                searching: true,
            });
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
    const { offset = DEFAULT_OFFSET, limit = DEFAULT_LIMIT } = options ?? {};

    const [
        { searchTerm, searching, artistResults, hasNext, hasPrevious },
        dispatch,
    ] = useReducer(useSearchStateReducer, undefined, () =>
        calculationsAndDefaults({
            limit,
            offset,
        })
    );

    const loadResults = useCallback(
        async (term?: string, offset?: number) => {
            if (term == null || term.trim() === "") {
                dispatch({ type: "CLEAR_SEARCH" });
                return;
            }

            dispatch({ type: "START_SEARCH", term, offset });

            const searchResult = await MusicBrainz.artistSearch(
                term,
                offset,
                limit
            );

            dispatch({ type: "FINISH_SEARCH", searchResult });
        },
        [limit]
    );

    const loadPrevious = useCallback(() => {
        if (artistResults == null || searchTerm == null) {
            return;
        }

        loadResults(searchTerm, artistResults.offset - limit);
    }, [artistResults, limit, loadResults, searchTerm]);

    const loadNext = useCallback(() => {
        if (artistResults == null || searchTerm == null) {
            return;
        }

        loadResults(searchTerm, artistResults.offset + limit);
    }, [artistResults, limit, loadResults, searchTerm]);

    useEffect(() => {
        dispatch({ type: "UPDATE_OPTIONS", limit, offset });
    }, [limit, offset]);

    return {
        hasNext,
        hasPrevious,
        loadNext,
        loadPrevious,
        results: artistResults,
        searching,
        search: loadResults,
    };
}
