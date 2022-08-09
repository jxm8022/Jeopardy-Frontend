import { Boardstate } from "./Boardstate";
import { Game } from "./Game";
import { IGameUI } from "./IGameUI";
import { Player } from "./Player";
import { QA } from "./QA";
import { SubCategory } from "./SubCategory";
import { Team } from "./Team";

export class GameUI implements IGameUI {
    constructor(
        public game: Game,
        public teams: Team[],
        public players: Player[][],
        public subcategories: SubCategory[],
        public questions: QA[],
        public boardstate: Boardstate[]
    ) { }
}