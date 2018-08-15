export default values => {
  const errors = {
    main: {},
    about: {},
    programs: {}
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

  return errors;
};