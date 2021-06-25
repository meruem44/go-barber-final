import { FakeAppointmentRepository } from "../repositories/fakes/FakeAppointmentRepository";
import { ListProviderDayAvailabilityService } from "./ListProviderDatAvailabilityService";

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe("ListDayAvailability", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it("slhoud be able tyo list provider day open", async () => {
    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "adsad",
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: "user",
      user_id: "adsad",
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const listAvailability = await listProviderDayAvailability.execute({
      provider_id: "user",
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(listAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
      ])
    );
  });
});
