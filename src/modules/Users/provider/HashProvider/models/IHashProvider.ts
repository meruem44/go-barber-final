interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHashed(payload: string, hashed: string): Promise<boolean>;
}

export { IHashProvider };
