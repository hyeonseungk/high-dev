import { ID } from '../../model/base/type/id';

export class DomainEvent {
  constructor(
    private readonly id: ID,
    private readonly createdAt: Date,
  ) {}
}
