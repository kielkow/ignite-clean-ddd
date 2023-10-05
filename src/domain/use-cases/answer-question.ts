import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {    
    async execute(
        { authorId, questionId, content }: AnswerQuestionUseCaseRequest
    ): Promise<Answer> {
        return new Answer({ 
            content, 
            questionId, 
            authorId 
        });
    }
}
