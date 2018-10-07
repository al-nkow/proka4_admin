export default values => {
  const errors = {};
  if (!values.question) {
    errors.question = 'Это поле обязательно для заполнения';
  }
  if (!values.answer) {
    errors.answer = 'Это поле обязательно для заполнения';
  }
  return errors;
};