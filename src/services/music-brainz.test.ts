import axios from "axios";
import { ArtistSearchResultFactory } from "../models/factories/artist-search-result-factory";
import { ArtistSearchResult } from "../models/interfaces/artist-search-result";
import MusicBrainz from "../services/music-brainz";

const setupMocks = ({ getResult }: { getResult: ArtistSearchResult }) => {
    const axiosGetMock = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: getResult });

    return { axiosGetMock };
};

describe("MusicBrainz", () => {
    test("artistSearch()", async () => {
        // Arrange
        const expectedReturnedValue = ArtistSearchResultFactory.create({
            artistCount: 1,
            offset: 0,
            totalCount: 1,
        });

        setupMocks({
            getResult: expectedReturnedValue,
        });

        // Act
        const result = await MusicBrainz.artistSearch("name");

        // Assert
        expect(result).toEqual(expectedReturnedValue);
    });
});
