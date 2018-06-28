import { isValidEmail } from '../../utils/validationRules';
export default values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Это поле обязательно для заполнения';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Неправильный формат';
  }

  if (!values.password) {
    errors.password = 'Это поле обязательно для заполнения';
  }
  return errors;
};