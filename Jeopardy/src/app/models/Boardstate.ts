import { IBoardstate } from "./IBoardstate";

export class Boardstate implements IBoardstate {
    constructor(
        public boardstate_id: number,
        public x_position: number,
        public y_position: number,
        public answered: boolean,
        public question_id: number,
        public game_id: number
    ) { }
}