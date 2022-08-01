import { Boardstate } from "./Boardstate";
import { Game } from "./Game";
import { QA } from "./QA";
import { SubCategory } from "./SubCategory";
import { Team } from "./Team";

export interface IGameUI {
    game: Game,
    teams: Team[],
    subcategories: SubCategory[],
    questions: QA[],
    boardstate: Boardstate[]
}