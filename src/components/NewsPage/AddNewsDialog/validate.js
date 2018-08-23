export default values => {
  const errors = {};
  if (!values.image) {
    errors.image = 'Это поле обязательно для заполнения';
  }
  if (!values.date) {
    errors.date = 'Это поле обязательно для заполнения';
  }
  if (!values.title) {
    errors.title = 'Это поле обязательно для заполнения';
  }
  return errors;
};