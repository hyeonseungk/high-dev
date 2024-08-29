import { ID } from '../../model/base/type/id';
import { Optional } from '../../model/base/type/optional';
import { Post } from '../../model/post-aggregate/post.entity';

export interface PostRepository {
  countByUserIdInSameDay(userId: ID, date: Date): Promise<number>;
  findOneById(postId: ID): Promise<Optional<Post>>;
  create(user: Post): Promise<void>; // TODO. create 할 때 void가 좋을까?
}
