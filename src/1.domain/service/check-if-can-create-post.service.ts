import { ID } from '../model/base/type/id';
import { PostRepository } from '../out-port/persistence/post.repository.interface';

export class CheckIfCanCreatePostService {
  constructor(private readonly postRepository: PostRepository) {}

  async check(userId: ID, today: Date) {
    const postCountAlreadyCreatedByUserSameDay =
      await this.postRepository.countByUserIdInSameDay(userId, today);
    if (postCountAlreadyCreatedByUserSameDay >= 5) {
      throw new Error();
    }
  }
}
