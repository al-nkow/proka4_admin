export default values => {
  const errors = {};
  if (!values.date) {
    errors.date = 'Это поле обязательно для заполнения';
  }
  if (!values.title) {
    errors.title = 'Это поле обязательно для заполнения';
  }
  return errors;
};