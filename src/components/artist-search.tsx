import React, { FormEvent, useRef } from "react";
import { Artist } from "../services/music-brainz";
import PageNavigation from "./page-navigation";

interface ArtistSearchProps {
    artists: Artist[];
    onNext?: () => void;
    onPrevious?: () => void;
    onSearch: (searchTerm?: string) => void;
    searching: boolean;
    totalResults?: number;
}

const ArtistSearch = ({
    artists,
    onNext,
    onPrevious,
    onSearch,
    searching,
    totalResults = 0,
}: ArtistSearchProps) => {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (evt: FormEvent) => {
        evt.preventDefault();
        evt.stopPropagation();

        onSearch(searchInputRef.current?.value);
    };

    return (
        <div className="flex flex-col items-center">
            <PageNavigation />

            <h1 className="py-2 text-xl font-semibold">Artist Search</h1>

            <form onSubmit={handleSearch}>
                <div className="flex">
                    <input
                        className="p-2 mr-0 text-gray-800 bg-white border-t border-b border-l border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-600"
                        placeholder="Search"
                        ref={searchInputRef}
                    />
                    <button
                        type="submit"
                        className="px-2 font-bold text-gray-800 uppercase bg-green-400 border-t border-b border-r rounded-r-lg border-gren-500 focus:ring-2 focus:ring-blue-600">
                        Search
                    </button>
                </div>
                <div className="h-4">
                    {searching && (
                        <div className="text-xs text-gray-400">
                            Searching...
                        </div>
                    )}
                </div>
            </form>

            {(!searching || totalResults > 0) && artists.length > 0 && (
                <div className="w-full p-4 mt-2">
                    <div>
                        <h2 className="inline mb-2 text-sm font-bold uppercase">
                            {totalResults} Artist Results
                        </h2>
                        <button
                            className="px-2 hover:underline hover:font-semibold"
                            onClick={onPrevious}>
                            {"< Prev"}
                        </button>
                        <button
                            className="px-2 hover:underline hover:font-semibold"
                            onClick={onNext}>
                            {"Next >"}
                        </button>
                    </div>
                    <ul>
                        {artists.map((artist) => (
                            <li
                                key={artist.id}
                                className="p-2 mb-2 border border-gray-300 border-solid rounded shadow bg-gray-50">
                                <div className="font-semibold">
                                    {artist.name}
                                </div>
                                <div>{artist.type}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ArtistSearch;
