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
            artists: ArtistFactory.createTestRecords({
                count: artistCount,
                startingId: offset + 1,
            }),
            count: totalCount,
            created: new Date().toISOString(),
            offset: offset,
        };
    },
};
