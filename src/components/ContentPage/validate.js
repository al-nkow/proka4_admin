import { isValidEmail } from '../../utils/validationRules';

export default values => {
  const errors = {
    main: {},
    about: {},
    programs: {
      program1: {},
      program2: {},
      program3: {},
    },
    benefits: {
      ben1: {},
      ben2: {},
      ben3: {},
      ben4: {},
      ben5: {},
      ben6: {},
    },
    prizes: {},
    teachers: {
      teacher1: {}
    },
    contacts: {}
  };

  if (values.main && !values.main.info) {
    errors.main.info = 'Это поле обязательно для заполнения';
  }

  if (values.main && !values.main.sub) {
    errors.main.sub = 'Это поле обязательно для заполнения';
  }

  if (values.about && !values.about.info) {
    errors.about.info = 'Это поле обязательно для заполнения';
  }

  if (values.programs && !values.programs.start) {
    errors.programs.start = 'Это поле обязательно для заполнения';
  }

  if (values.programs && values.programs.program1 && !values.programs.program1.name) {
    errors.programs.program1.name = 'Это поле обязательно для заполнения';
  }
  if (values.programs && values.programs.program1 && !values.programs.program1.price) {
    errors.programs.program1.price = 'Это поле обязательно для заполнения';
  }

  if (values.benefits && values.benefits.ben1 && !values.benefits.ben1.name) {
    errors.benefits.ben1.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben1 && !values.benefits.ben1.body) {
    errors.benefits.ben1.body = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben2 && !values.benefits.ben2.name) {
    errors.benefits.ben2.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben2 && !values.benefits.ben2.body) {
    errors.benefits.ben2.body = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben3 && !values.benefits.ben3.name) {
    errors.benefits.ben3.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben3 && !values.benefits.ben3.body) {
    errors.benefits.ben3.body = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben4 && !values.benefits.ben4.name) {
    errors.benefits.ben4.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben4 && !values.benefits.ben4.body) {
    errors.benefits.ben4.body = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben5 && !values.benefits.ben5.name) {
    errors.benefits.ben5.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben5 && !values.benefits.ben5.body) {
    errors.benefits.ben5.body = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben6 && !values.benefits.ben6.name) {
    errors.benefits.ben6.name = 'Это поле обязательно для заполнения';
  }
  if (values.benefits && values.benefits.ben6 && !values.benefits.ben6.body) {
    errors.benefits.ben6.body = 'Это поле обязательно для заполнения';
  }

  if (values.prizes && !values.prizes.title) {
    errors.prizes.title = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.subtitle) {
    errors.prizes.subtitle = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.prize1) {
    errors.prizes.prize1 = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.prize2) {
    errors.prizes.prize2 = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.prize3) {
    errors.prizes.prize3 = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.prize4) {
    errors.prizes.prize4 = 'Это поле обязательно для заполнения';
  }
  if (values.prizes && !values.prizes.prize5) {
    errors.prizes.prize5 = 'Это поле обязательно для заполнения';
  }

  if (values.teachers && values.teachers.teacher1 && !values.teachers.teacher1.name) {
    errors.teachers.teacher1.name = 'Это поле обязательно для заполнения';
  }
  if (values.teachers && values.teachers.teacher1 && !values.teachers.teacher1.paragraph1) {
    errors.teachers.teacher1.paragraph1 = 'Это поле обязательно для заполнения';
  }

  if (values.contacts && !values.contacts.inn) {
    errors.contacts.inn = 'Это поле обязательно для заполнения';
  }
  if (values.contacts && !values.contacts.ogrn) {
    errors.contacts.ogrn = 'Это поле обязательно для заполнения';
  }
  if (values.contacts && !values.contacts.address) {
    errors.contacts.address = 'Это поле обязательно для заполнения';
  }
  if (values.contacts && !values.contacts.mobile) {
    errors.contacts.mobile = 'Это поле обязательно для заполнения';
  }
  if (values.contacts && !values.contacts.phone) {
    errors.contacts.phone = 'Это поле обязательно для заполнения';
  }
  if (values.contacts && !values.contacts.email) {
    errors.contacts.email = 'Это поле обязательно для заполнения';
  } else if (!isValidEmail(values.contacts.email)) {
    errors.contacts.email = 'Неправильный формат email';
  }

  return errors;
};