import { ID } from '../../../../1.domain/model/base/type/id';
import {
  BoardType,
  TechType,
} from '../../../../1.domain/model/post-aggregate/post.entity';

export class CreatePostCommand {
  constructor(
    readonly userId: ID,
    readonly content: string,
    readonly boardType: BoardType,
    readonly techType: TechType,
    readonly today: Date, // TODO. 왜 바깥으로 뺄 수록 좋은지 jojoldu님 블로그 글 확인
  ) {}
}
