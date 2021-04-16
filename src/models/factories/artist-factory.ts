import { ArtistRecord } from "../records/artist-record";
import { CollectionUtils } from "../../utils/collection-utils";

export const ArtistFactory = {
    createTestRecord({ id }: { id: number }): ArtistRecord {
        return new ArtistRecord({
            id: `id-${id}`,
            name: `name-${id}`,
            type: `type-${id}`,
        });
    },
    createTestRecords({
        startingId = 1,
        count = 1,
    }: {
        startingId?: number;
        count?: number;
    }): Array<ArtistRecord> {
        return CollectionUtils.range(startingId, count).map((num) =>
            ArtistFactory.createTestRecord({ id: num })
        );
    },
};
