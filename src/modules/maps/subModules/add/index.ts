import type { IAddMapDto } from './types.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type MapRepository from '../../repository/index.js';

export default class AddMapController implements IAbstractSubController<string> {
  constructor(repo: MapRepository) {
    this.repo = repo;
  }

  private accessor repo: MapRepository;

  async execute(data: IAddMapDto): Promise<string> {
    return this.repo.add(data);
  }
}
