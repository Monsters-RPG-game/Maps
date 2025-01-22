import type * as enums from '../enums/index.js';
import type MapController from '../modules/maps/controller.js';
import type AddMapSubController from '../modules/maps/subModules/add/index.js';
import type GetMapSubController from '../modules/maps/subModules/get/index.js';

export type IControllerActions = enums.EMapActions;

type IControllerActionsMap = {
  [K in IControllerActions]: unknown;
};

export interface IMapControllers extends IControllerActionsMap {
  [enums.EMapActions.Get]: GetMapSubController;
  [enums.EMapActions.Add]: AddMapSubController;
}

export interface IController {
  [enums.EControllers.Map]: MapController;
}

export interface IInnerController {
  [enums.EControllers.Map]: IMapControllers;
}
