import { IHashProvider } from "../models/IHashProvider";

class FakeHasheProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHashed(
    payload: string,
    hashed: string
  ): Promise<boolean> {
    return payload === hashed;
  }
}

export { FakeHasheProvider };
