import { IGame } from "./IGame";

export class Game implements IGame {
    constructor(
        public game_id: number,
        public game_winner: number,
        public current_team: number
    ) { }
}