import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        public Id: number,
        public Name: string,
        public Team_id: number
    ) { }
}
