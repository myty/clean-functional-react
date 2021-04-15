import axios from "axios";
import MusicBrainz, {
    MusicBrainzArtistSearchResult,
} from "../services/music-brainz";

const setupMocks = ({
    getResult,
}: {
    getResult: MusicBrainzArtistSearchResult;
}) => {
    const axiosGetMock = jest
        .spyOn(axios, "get")
        .mockResolvedValue({ data: getResult });

    return { axiosGetMock };
};

describe("MusicBrainz", () => {
    test("artistSearch", async () => {
        // Arrange
        const expectedReturnedValue: MusicBrainzArtistSearchResult = {
            artists: [
                {
                    id: "id",
                    name: "name",
                    type: "type",
                },
            ],
            count: 1,
            created: new Date().toISOString(),
            offset: 0,
        };

        setupMocks({
            getResult: expectedReturnedValue,
        });

        // Act
        const result = await MusicBrainz.artistSearch("name");

        // Assert
        expect(result).toEqual(expectedReturnedValue);
    });
});
