import { Boardstate } from "./Boardstate";
import { Game } from "./Game";
import { Player } from "./Player";
import { QA } from "./QA";
import { SubCategory } from "./SubCategory";
import { Team } from "./Team";

export interface IGameUI {
    game: Game,
    teams: Team[],
    players: Player[][],
    subcategories: SubCategory[],
    questions: QA[],
    boardstate: Boardstate[]
}