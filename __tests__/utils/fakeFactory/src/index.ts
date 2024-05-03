import FakeMaps from './maps';
import FakeCharacterLocation from './characterLocation';

export default class FakeFactory {
  private readonly _maps: FakeMaps;
  private readonly _characterLocation: FakeCharacterLocation;

  constructor() {
    this._maps = new FakeMaps();
    this._characterLocation = new FakeCharacterLocation();
  }

  get maps(): FakeMaps {
    return this._maps;
  }

  get characterLocation(): FakeCharacterLocation {
    return this._characterLocation;
  }

  async cleanUp(): Promise<void> {
    await this._maps.cleanUp();
  }
}
