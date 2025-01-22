import MapModel from './model.js';
import MapRepository from './repository/index.js';
import * as enums from '../../enums/index.js';
import AddMapController from './subModules/add/index.js';
import GetMapController from './subModules/get/index.js';
import AbstractController from '../../tools/abstractions/controller.js';

export default class MapController extends AbstractController<enums.EControllers.Map> {
  /**
   * Register map controllers.
   * @returns Void.
   */
  protected init(): void {
    const repo = new MapRepository(MapModel);

    this.register(enums.EMapActions.Get, new GetMapController(repo));
    this.register(enums.EMapActions.Add, new AddMapController(repo));
  }
}
