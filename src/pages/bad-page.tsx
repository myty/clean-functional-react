import React, { useState } from "react";
import useBadSearch from "../hooks/use-bad-search";
import ArtistSearch from "../components/artist-search";
import { ArtistSearchResult } from "../models/interfaces/artist-search-result";

const PAGE_SIZE = 25;

const BadPage: React.FC = () => {
    const [
        artistSearchResult,
        setArtistSearchResult,
    ] = useState<ArtistSearchResult>();
    const [searchTerm, setSearchTerm] = useState<string>();
    const [offset, setOffset] = useState<number>(0);
    const { search, searching } = useBadSearch();

    const hasNext =
        artistSearchResult != null &&
        artistSearchResult?.count - (artistSearchResult?.offset + PAGE_SIZE) >
            0;

    const hasPrevious =
        artistSearchResult != null && artistSearchResult.offset > 0;

    const handleSearch = async (term?: string) => {
        setSearchTerm(term);

        const result = await search({ term });
        if (result != null) {
            setArtistSearchResult(result);
        }
    };

    const loadNext = async () => {
        const nextOffset = offset + PAGE_SIZE;
        setOffset(nextOffset);
        const result = await search({ term: searchTerm, offset: nextOffset });
        if (result != null) {
            setArtistSearchResult(result);
        }
    };

    const loadPrevious = async () => {
        const nextOffset = offset - PAGE_SIZE;
        setOffset(nextOffset);
        const result = await search({ term: searchTerm, offset: nextOffset });
        if (result != null) {
            setArtistSearchResult(result);
        }
    };

    return (
        <ArtistSearch
            artists={artistSearchResult?.artists ?? []}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onNext={loadNext}
            onPrevious={loadPrevious}
            onSearch={handleSearch}
            searching={searching}
            totalResults={artistSearchResult?.count ?? 0}
        />
    );
};

export default BadPage;
