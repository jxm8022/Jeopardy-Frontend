import { IGamestate } from "./IGamestate";

export class Gamestate implements IGamestate {
    constructor(
        public gamestate_id: number,
        public team_id: number,
        public game_id: number
    ) { }
}