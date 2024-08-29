import { ID } from '../../../../1.domain/model/base/type/id';
import { CommentType } from '../../../../1.domain/model/comment-aggregate/comment.entity';

export class CreateCommentCommand {
  constructor(
    readonly userId: ID,
    readonly content: string,
    readonly postId: ID,
    readonly type: CommentType,
  ) {}
}
