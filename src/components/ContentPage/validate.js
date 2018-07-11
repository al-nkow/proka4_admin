export default values => {
  const errors = {
    main: {},
    about: {}
  };

  if (values.main && !values.main.info) {
    errors.main.info = 'Это поле обязательно для заполнения';
  }

  if (values.about && !values.about.info) {
    errors.about.info = 'Это поле обязательно для заполнения';
  }

  return errors;
};