import { Artist } from "./artist";
import { SearchResult } from "./search-result";

export interface ArtistSearchResult extends SearchResult {
    artists: Array<Artist>;
}
