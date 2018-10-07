export default values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Это поле обязательно для заполнения';
  }
  if (!values.newpassword) {
    errors.newpassword = 'Это поле обязательно для заполнения';
  }
  if ((values.newpassword && values.newpasswordagain) && (values.newpassword !== values.newpasswordagain)) {
    errors.newpassword = 'Новый пароль и повторный его ввод не совпадают';
    errors.newpasswordagain = 'Новый пароль и повторный его ввод не совпадают';
  }

  return errors;
};