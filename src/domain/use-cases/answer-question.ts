import { Answer } from "../entities/answer";

interface AnswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string;
}

export class AnswerQuestionUseCase {
    // constructor(private readonly questionRepository: QuestionRepository) {}
    
    async execute(
        { instructorId, questionId, content }: AnswerQuestionUseCaseRequest
    ): Promise<Answer> {
        return new Answer(content, questionId, instructorId);
        
        // const question = await this.questionRepository.findById(questionId);
        // if (!question) throw new QuestionNotFoundError();
        // if (question.answer) throw new QuestionAlreadyAnsweredError();
        // question.answer = answer;
        // await this.questionRepository.save(question);
    }
}
