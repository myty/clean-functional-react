import React, { useCallback, useState } from "react";
import ArtistSearch from "../components/artist-search";
import useGoodSearch from "../hooks/use-good-search";

const LIMIT = 25;

const GoodPage: React.FC<{}> = () => {
    const { results, search, searching } = useGoodSearch({ limit: LIMIT });
    const [searchTerm, setSearchTerm] = useState<string>();

    const artistResults = results?.artists ?? [];
    const currentOffset = results?.offset ?? 0;

    const handlePrevClick = useCallback(
        () =>
            search({
                offset: currentOffset - LIMIT,
                term: searchTerm,
            }),
        [currentOffset, search, searchTerm]
    );

    const handleNextClick = useCallback(
        () =>
            search({
                offset: currentOffset + LIMIT,
                term: searchTerm,
            }),
        [currentOffset, search, searchTerm]
    );

    const handleSearch = (term?: string) => {
        setSearchTerm(term);
        search({ term });
    };

    return (
        <ArtistSearch
            artists={artistResults}
            onNext={handleNextClick}
            onPrevious={handlePrevClick}
            onSearch={handleSearch}
            searching={searching}
            totalResults={results?.count ?? 0}
        />
    );
};

export default GoodPage;
