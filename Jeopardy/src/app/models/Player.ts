import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        public player_id: number,
        public player_name: string,
        public team_id: number
    ) { }
}
