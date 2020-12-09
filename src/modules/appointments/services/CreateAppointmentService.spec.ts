import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123123');
  });
});

describe('CreateAppointment', () => {
  it('should be not able to create two appointments on same date', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});