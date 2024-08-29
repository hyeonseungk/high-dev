import { ID } from '../model/base/type/id';

export class NewCommentCreatedEvent {
  constructor(
    private readonly userId: ID,
    private readonly postId: ID,
    private readonly commentId: ID,
  ) {}
}
