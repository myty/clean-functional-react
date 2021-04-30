import { ArtistRecord } from "./artist-record";

describe("ArtistRecord", () => {
    test("creates new record", () => {
        // Arrange
        const id = "1";
        const name = "name";
        const type = "type";

        // Act
        const record = new ArtistRecord({ id, name, type });

        // Assert
        expect(record.id).toBe(id);
        expect(record.name).toBe(name);
        expect(record.type).toBe(type);
    });
});
