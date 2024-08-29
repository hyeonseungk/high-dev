import { Post } from '../../1.domain/model/post-aggregate/post.entity';
import { PostRepository } from '../../1.domain/out-port/persistence/post.repository.interface';
import { CheckIfCanCreatePostService } from '../../1.domain/service/check-if-can-create-post.service';
import { CreatePostCommand } from '../in-port/post-manage.usecase/command/create-post.command';
import { UpdatePostCommand } from '../in-port/post-manage.usecase/command/update-post.command';
import { PostManageUseCase } from '../in-port/post-manage.usecase/post-manage.usecase';

export class PostManageService implements PostManageUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly checkIfCanCreatePostService: CheckIfCanCreatePostService,
  ) {}

  async createPost(command: CreatePostCommand): Promise<Post> {
    const { userId, content, boardType, techType, today } = command;
    await this.checkIfCanCreatePostService.check(userId, today);
    const post = Post.create({
      id: Post.generateNewId(),
      content,
      boardType,
      techType,
      createdAt: null,
    });
    await this.postRepository.create(post);
    return post;
  }

  async updatePost(command: UpdatePostCommand): Promise<Post> {
    const { postId, content, boardType, techType } = command;
    const post = (await this.postRepository.findOneById(postId)).orElseThrow(
      () => new Error(),
    );
    if (content) {
      post.changeContent(content);
    }
    if (boardType) {
      post.changeBoardType(boardType);
    }
    if (techType) {
      post.changeTechType(techType);
    }
    post.validate();
    //await this.postRepository.save(post); // TODO. Prisma가 persistent 캐싱 지언하는지 체크
    return post;
  }
}
