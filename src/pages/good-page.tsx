import React from "react";
import ArtistSearch from "../components/artist-search";
import useGoodSearch from "../hooks/use-good-search";

const LIMIT = 25;

const GoodPage: React.FC = () => {
    const {
        hasNext,
        hasPrevious,
        loadNext,
        loadPrevious,
        results,
        search,
        searching,
    } = useGoodSearch({ limit: LIMIT });

    return (
        <ArtistSearch
            artists={results?.artists ?? []}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onNext={loadNext}
            onPrevious={loadPrevious}
            onSearch={search}
            searching={searching}
            totalResults={results?.count ?? 0}
        />
    );
};

export default GoodPage;
