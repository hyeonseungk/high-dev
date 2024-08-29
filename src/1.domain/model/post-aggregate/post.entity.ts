import { AggregateRoot } from '../base/aggreaget-root';
import { ID } from '../base/type/id';
import { Content } from './content.vo';

export enum BoardType {
  TECH = 'TECH',
  CAREER = 'CAREER',
  FREE = 'FREE',
}

export enum TechType {
  COMPUTER_SCIENCE = 'COMPUTER_SCIENCE',
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
  AI = 'AI',
  ETC = 'ETC',
}

export type PostCreateParams = {
  id: ID;
  content: string;
  boardType: BoardType;
  techType: TechType | null;
  createdAt: Date | null;
};

export class Post extends AggregateRoot {
  private constructor(
    id: ID,
    private content: Content,
    private boardType: BoardType,
    private techType: TechType,
    private readonly createdAt: Date | null,
  ) {
    super(id);
    this.validate();
  }

  static create(params: PostCreateParams) {
    const { id, content, boardType, techType, createdAt } = params;
    return new Post(
      id,
      Content.create({ value: content }),
      boardType,
      techType,
      createdAt,
    );
  }

  public validate() {
    if (
      (this.boardType === BoardType.TECH && this.techType === null) ||
      (this.boardType !== BoardType.TECH && this.techType !== null)
    ) {
      throw new Error();
    }
  }

  changeContent(content: string) {
    this.content = Content.create({ value: content });
  }

  changeBoardType(boardTyep: BoardType) {
    this.boardType = boardTyep;
  }

  changeTechType(techType: TechType) {
    this.techType = techType;
  }
}
