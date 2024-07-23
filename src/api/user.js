import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  playbook_name: faker.system.commonFileName(),
  Createat: faker.date.anytime(),
  status: sample(['success', 'failed']),
}));
