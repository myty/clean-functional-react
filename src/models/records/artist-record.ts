import { ImmutableRecord } from "simple-immutable-record";
import { Artist } from "../interfaces/artist";

export class ArtistRecord extends ImmutableRecord<Artist>({
    id: "",
    name: "",
    type: "",
}) {}
