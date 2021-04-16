import { ArtistSearchResult } from "../interfaces/artist-search-result";
import { ArtistFactory } from "./artist-factory";

export const ArtistSearchResultFactory = {
    create({
        artistCount,
        offset,
        totalCount,
    }: {
        artistCount: number;
        offset: number;
        totalCount: number;
    }): ArtistSearchResult {
        return {
            artists: ArtistFactory.createTestRecords({ count: artistCount }),
            count: totalCount,
            created: new Date().toISOString(),
            offset: offset,
        };
    },
};
