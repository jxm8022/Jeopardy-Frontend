import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor(
        public ID: number,
        public Name: string,
        public Team_ID: number
    ) { }
}
