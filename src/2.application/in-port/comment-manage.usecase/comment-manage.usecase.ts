import { CreateCommentCommand } from './command/create-comment.command';
import { CreateNestedCommentCommand } from './command/create-nested-comment.command';

export interface CommentManageUseCase {
  createComment(command: CreateCommentCommand): Promise<Comment>;
  createNestedComment(command: CreateNestedCommentCommand): Promise<Comment>;
}
