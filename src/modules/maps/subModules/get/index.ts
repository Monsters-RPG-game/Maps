import type GetMapDto from './dto.js';
import type { IAbstractSubController } from '../../../../types/index.js';
import type { IMapEntity } from '../../entity.js';
import type MapRepository from '../../repository/index.js';

export default class GetMapController implements IAbstractSubController<IMapEntity | null> {
  constructor(repo: MapRepository) {
    this.repo = repo;
  }

  private accessor repo: MapRepository;

  async execute(data: GetMapDto): Promise<IMapEntity | null> {
    return this.repo.get(data.id);
  }
}
