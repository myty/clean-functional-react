import axios from "axios";
import { ArtistSearchResult } from "../models/interfaces/artist-search-result";

const MusicBrainz = {
    artistSearch: async (
        searchTerm: string,
        offset: number = 0,
        limit: number = 25
    ) => {
        const { data } = await axios.get<ArtistSearchResult>(
            `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(
                searchTerm
            )}&limit=${limit}&offset=${offset}`
        );

        return data;
    },
};

export default MusicBrainz;
