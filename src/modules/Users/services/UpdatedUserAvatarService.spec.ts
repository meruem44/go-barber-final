import "reflect-metadata";

import { AppError } from "@shared/errors/AppError";

import { UpdatedUserAvatarService } from "./UpdatedUserAvatarService";
import { FakeUserRepository } from "@modules/Users/repositories/fakes/FakeUserRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatedUserAvatar: UpdatedUserAvatarService;

describe("UpdatedUserProvider", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updatedUserAvatar = new UpdatedUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
  });

  it("shold be able to updated avatar user", async () => {
    const user = await fakeUserRepository.create({
      name: "john Doe",
      email: "asa@ddsd.com",
      password: "123456",
    });

    await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.png",
    });

    expect(user.avatar).toBe("avatar.png");
  });

  it("shold not be able to updated user not exist", async () => {
    expect(
      updatedUserAvatar.execute({
        user_id: "wewqwqw",
        avatarFileName: "avatar.png",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shold be able to delete old avatar and updated new avatar", async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, "deleteFile");

    const user = await fakeUserRepository.create({
      name: "john Doe",
      email: "asa@ddsd.com",
      password: "123456",
    });

    await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar.png",
    });

    await updatedUserAvatar.execute({
      user_id: user.id,
      avatarFileName: "avatar2.png",
    });

    expect(deleteFile).toHaveBeenCalledWith("avatar.png");
    expect(user.avatar).toBe("avatar2.png");
  });
});
