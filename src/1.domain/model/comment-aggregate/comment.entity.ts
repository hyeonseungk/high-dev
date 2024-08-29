import { AggregateRoot } from '../base/aggreaget-root';
import { ID } from '../base/type/id';
import { Content } from './content.vo';

export enum CommentType {
  PLAIN = 'PLAIN',
  NESTED = 'NESTED',
}

export type CommentCreateParams = {
  id: ID;
  postId: ID;
  content: string;
  type: CommentType;
  parentComentId: ID | null;
  createdAt: Date | null;
};

export class Comment extends AggregateRoot {
  private constructor(
    id: ID,
    private readonly postId: ID,
    private readonly content: Content,
    private readonly type: CommentType,
    private readonly parentCommentId: ID | null,
    private readonly createdAt: Date | null,
  ) {
    super(id);
    this.validate();
  }

  static create(params: CommentCreateParams) {
    const { id, postId, content, type, parentComentId, createdAt } = params;
    return new Comment(
      id,
      postId,
      Content.create({ value: content }),
      type,
      parentComentId,
      createdAt,
    );
  }

  protected validate() {
    if (this.type === CommentType.PLAIN) {
      if (this.parentCommentId !== null) {
        throw new Error();
      }
    }
    if (this.type === CommentType.NESTED) {
      if (this.parentCommentId === null) {
        throw new Error();
      }
    }
  }
}
