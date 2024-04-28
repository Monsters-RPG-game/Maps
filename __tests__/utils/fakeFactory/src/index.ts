import FakeMaps from './maps';

export default class FakeFactory {
  private readonly _maps: FakeMaps;

  constructor() {
    this._maps = new FakeMaps();
  }

  get maps(): FakeMaps {
    return this._maps;
  }

  async cleanUp(): Promise<void> {
    await this._maps.cleanUp();
  }
}
