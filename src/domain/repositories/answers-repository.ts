import { Answer } from "../entities/answer";

export interface AnswersRepository {
    createAnswer(answer: Answer): Promise<Answer>;
}
