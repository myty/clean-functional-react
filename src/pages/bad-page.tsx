import React, { useState } from "react";
import useBadSearch from "../hooks/use-bad-search";
import ArtistSearch from "../components/artist-search";
import { Artist } from "../models/interfaces/artist";

const BadPage: React.FC<{}> = () => {
    const [artistResults, setArtistResults] = useState<Array<Artist>>([]);
    const { search, searching } = useBadSearch();

    const handleSearch = async (term?: string) => {
        const results = await search({ term });
        if (results != null) {
            setArtistResults(results.artists);
        }
    };

    return (
        <ArtistSearch
            artists={artistResults}
            onSearch={handleSearch}
            searching={searching}
        />
    );
};

export default BadPage;
