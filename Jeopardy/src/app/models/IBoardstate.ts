export interface IBoardstate {
    boardstate_id: number,
    x_position: number,
    y_position: number,
    answered: boolean,
    question_id: number,
    game_id: number
}