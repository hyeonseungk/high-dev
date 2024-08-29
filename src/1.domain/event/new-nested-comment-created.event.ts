import { ID } from '../model/base/type/id';

export class NewNestedCommentCreatedEvent {
  constructor(
    private readonly userId: ID,
    private readonly postId: ID,
    private readonly parentCommentId: ID,
    private readonly nestedCommentId: ID,
  ) {}
}
