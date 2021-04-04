import React, { FormEvent, useRef, useState } from "react";
import { Artist } from "../services/music-brainz";
import useSearch from "../hooks/bad/use-search";

const BadPage: React.FC<{}> = () => {
    const [artistResults, setArtistResults] = useState<Array<Artist>>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { search, searching } = useSearch();

    const handleSearch = async (evt: FormEvent) => {
        evt.preventDefault();
        evt.stopPropagation();

        const results = await search({ term: searchInputRef.current?.value });
        if (results != null) {
            setArtistResults(results.artists);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold py-2">Artist Search</h1>

            <form onSubmit={handleSearch}>
                <label className="block text-sm font-bold">Search</label>
                <div className="flex">
                    <input
                        className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                        placeholder="Search"
                        ref={searchInputRef}
                    />
                    <button
                        type="submit"
                        className="px-2 rounded-r-lg bg-green-400  text-gray-800 font-bold p-4 uppercase border-gren-500 border-t border-b border-r">
                        Search
                    </button>
                </div>
            </form>

            <div>
                <h2>Results</h2>

                {searching ? (
                    "Searching..."
                ) : (
                    <ul>
                        {artistResults.map((artist) => (
                            <li key={artist.id}>{artist.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default BadPage;
