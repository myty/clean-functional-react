import { useCallback, useState } from "react";
import MusicBrainz from "../services/music-brainz";

interface UseSearchOptions {
    term?: string;
    offset?: number;
    limit?: number;
}

export default function useBadSearch(options?: UseSearchOptions) {
    const { term, offset, limit } = options ?? {};

    const [searching, setSearching] = useState(false);

    const getSearchResults = useCallback(
        async (searchOption?: UseSearchOptions) => {
            const { offset: searchOffset, limit: searchLimit } =
                searchOption ?? {};

            const searchTerm = searchOption?.term ?? term;
            if (searchTerm == null || searchTerm.trim() === "") {
                return undefined;
            }

            setSearching(true);

            const artistResults = await MusicBrainz.artistSearch(
                searchTerm,
                searchOffset ?? offset,
                searchLimit ?? limit
            );

            setSearching(false);

            return artistResults;
        },
        [limit, offset, term]
    );

    return {
        searching,
        search: getSearchResults,
    };
}
