import { faker } from "@faker-js/faker";

export const generateFakeUsers = (count = 500) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const registeredDate = faker.date.past(2);

    users.push({
      id: faker.string.uuid(),
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      city: faker.address.city(),
      registeredDate,
    });
  }

  return users;
};
