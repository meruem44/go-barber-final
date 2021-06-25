import { FakeAppointmentRepository } from "@modules/Appointments/repositories/fakes/FakeAppointmentRepository";
import { FakeNotificationsRepository } from "@modules/Notificatios/repositories/fakes/FakeNotificationsRepository";
import { CreateAppointmentService } from "./CreateAppointmentService";
import { AppError } from "@shared/errors/AppError";

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
let fakeNotifications: FakeNotificationsRepository;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotifications = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotifications
    );
  });

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: "asdasdasd",
      user_id: "sadasd",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("asdasdasd");
  });

  it("should not be able to create a new appointment o the same date", async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: "asdasdasd",
      user_id: "sdasd",
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: "asdasdasd",
        user_id: "wqeqwe",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointemnt on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 12),
        provider_id: "asdasdasd",
        user_id: "wqeqwe",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointemntwith same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 13),
        provider_id: "asdasdasd",
        user_id: "asdasdasd",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointemntwith same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 9, 13),
        provider_id: "asdasdasd",
        user_id: "asdasdasd",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointemnt before", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 7),
        provider_id: "asdasdasd",
        user_id: "sdsd",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointemnt after", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2021, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 18),
        provider_id: "asdasdasd",
        user_id: "sdddsss",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
