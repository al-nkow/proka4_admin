export default values => {
  const errors = {};

  if (!values.link) {
    errors.link = 'Это поле обязательно для заполнения';
  }

  if (!values.order) {
    errors.order = 'Укажите номер';
  }

  if (!values.comments || !values.comments.length) {
    errors.comments = {_error: 'Отсутствуют комментарии'};
  } else {
    const commentsArrayErrors = [];
    values.comments.forEach((comment, index) => {
      const commentErrors = {};
      if (!comment || !comment.name) {
        commentErrors.name = 'Это поле обязательно для заполнения';
        commentsArrayErrors[index] = commentErrors;
      }
      if (!comment || !comment.comment) {
        commentErrors.comment = 'Это поле обязательно для заполнения';
        commentsArrayErrors[index] = commentErrors;
      }
    });
    if (commentsArrayErrors.length) errors.comments = commentsArrayErrors;
  }

  return errors;
};