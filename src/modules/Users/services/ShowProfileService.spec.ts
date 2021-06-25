import { AppError } from "@shared/errors/AppError";
import { FakeUserRepository } from "../repositories/fakes/FakeUserRepository";
import { ShowProfileService } from "../services/ShowProfileService";

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe("ShowUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it("to be able to show user info", async () => {
    const user = await fakeUsersRepository.create({
      name: "leandro",
      email: "leandro@dasd.com",
      password: "123456",
    });

    const profile = await showProfileService.execute(user.id);

    expect(profile.name).toBe("leandro");
    expect(profile.email).toBe("leandro@dasd.com");
    expect(profile.password).toBe("123456");
  });
});
