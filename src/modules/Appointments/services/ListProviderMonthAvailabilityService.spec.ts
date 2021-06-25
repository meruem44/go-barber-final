import { FakeAppointmentRepository } from "../repositories/fakes/FakeAppointmentRepository";
import { ListProviderMonthAvailabilityService } from "./ListProviderMonthAvailabilityService";

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe("ListProviderMonthAvaialibity", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it("slhoud be able tyo list provider day open", async () => {
    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "asgdhasd",
      date: new Date(2020, 4, 21, 10, 0, 0),
    });

    const listAvailability = await listProviderMonthAvailability.execute({
      provider_id: "user",
      month: 5,
      year: 2020,
    });

    expect(listAvailability).toEqual(
      expect.arrayContaining([
        { day: 20, available: false },
        { day: 21, available: true },
      ])
    );
  });
});
