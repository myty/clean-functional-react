import { useCallback, useState } from "react";
import MusicBrainz, {
    MusicBrainzArtistSearchResult,
} from "../services/music-brainz";

interface UseSearhOptions {
    term?: string;
    offset?: number;
    limit?: number;
}

export default function useGoodSearch(options?: UseSearhOptions) {
    const { term, offset, limit } = options ?? {};

    const [searching, setSearching] = useState(false);
    const [
        artistResults,
        setArtistResults,
    ] = useState<MusicBrainzArtistSearchResult>();

    const loadResults = useCallback(
        async (searchOption?: UseSearhOptions) => {
            const { offset: searchOffset, limit: searchLimit } =
                searchOption ?? {};

            const searchTerm = searchOption?.term ?? term;
            if (searchTerm == null || searchTerm.trim() === "") {
                return undefined;
            }

            setSearching(true);

            setArtistResults(
                await MusicBrainz.artistSearch(
                    searchTerm,
                    searchOffset ?? offset,
                    searchLimit ?? limit
                )
            );

            setSearching(false);
        },
        [limit, offset, term]
    );

    return {
        results: artistResults,
        searching,
        search: (searchOptions?: UseSearhOptions) => {
            loadResults(searchOptions);
        },
    };
}
