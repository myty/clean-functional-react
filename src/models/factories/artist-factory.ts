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
    createTestRecords({ count = 1 }: { count?: number }): Array<ArtistRecord> {
        return CollectionUtils.range(0, count).map((num) =>
            ArtistFactory.createTestRecord({ id: num })
        );
    },
};
