import axios from "axios";

export interface Artist {
    id: string;
    name: string;
    type: string;
}

export interface MusicBrainzArtistSearchResult {
    artists: Array<Artist>;
    count: number;
    created: string;
    offset: number;
}

const MusicBrainz = {
    artistSearch: async (
        searchTerm: string,
        offset: number = 0,
        limit: number = 25
    ) => {
        const results = await axios.get<MusicBrainzArtistSearchResult>(
            `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(
                searchTerm
            )}&limit=${limit}&offset=${offset}`
        );

        return results.data;
    },
};

export default MusicBrainz;
