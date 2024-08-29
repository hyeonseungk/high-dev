import { ID } from '../../../../1.domain/model/base/type/id';
import {
  BoardType,
  TechType,
} from '../../../../1.domain/model/post-aggregate/post.entity';

export class UpdatePostCommand {
  constructor(
    readonly postId: ID,
    readonly content?: string,
    readonly boardType?: BoardType,
    readonly techType?: TechType,
  ) {}
}
