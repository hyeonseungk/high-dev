import { Post } from '../../../1.domain/model/post-aggregate/post.entity';
import { CreatePostCommand } from './command/create-post.command';
import { UpdatePostCommand } from './command/update-post.command';

export interface PostManageUseCase {
  createPost(command: CreatePostCommand): Promise<Post>;
  updatePost(command: UpdatePostCommand): Promise<Post>;
}
