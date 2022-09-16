export interface TwitchGame {
  data: Game[];
  pagination: Pagination;
}

interface Game {
  id: string;
  name: string;
  box_art_url: string;
}

interface Pagination {
  cursor: string;
}
