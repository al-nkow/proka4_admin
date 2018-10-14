export default values => {
  const errors = {};
  if (!values.image) {
    errors.image = 'Это поле обязательно для заполнения';
  }
  if (!values.link) {
    errors.link = 'Это поле обязательно для заполнения';
  }
  return errors;
};