import { ID } from '../model/base/type/id';

export class NewPostCreatedEvent {
  constructor(
    private readonly userId: ID,
    private readonly postId: ID,
  ) {}
}
