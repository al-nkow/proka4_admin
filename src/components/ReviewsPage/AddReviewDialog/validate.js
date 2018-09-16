export default values => {

  console.log('>>> VALUES VALIDATE >>>', values);

  const errors = {
    comments: [{}]
  };
  if (!values.link) {
    errors.link = 'Это поле обязательно для заполнения';
  }
  if (!values.image && !values.imageLink) {
    errors.image = 'Это поле обязательно для заполнения';
  }
  if (!values.order) {
    errors.order = 'Это поле обязательно для заполнения';
  }
  if (!values.comments) {
    errors.comments = {_error: 'Отсутствуют комментарии'};
  }
  if (values.comments && values.comments[0] && !values.comments[0].name) {
    errors.comments[0].name = 'Это поле обязательно для заполнения';
  }
  if (values.comments && values.comments[0] && !values.comments[0].comment) {
    errors.comments[0].comment = 'Это поле обязательно для заполнения';
  }
  return errors;
};