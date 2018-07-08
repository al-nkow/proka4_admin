import { loginUser } from '../services/auth';
import { saveToken } from '../../utils/api';
import history from '../../history';

// admin@admin.com admin
// work: test@test.com test

const login = ({ email, password }) => dispatch => {
  // dispatch(loginRequest());
  return loginUser(email, password)
    // .then(({ data }) => {
    .then((result) => {
      const { data } = result;

      console.log('LOGIN RESULT: ', data);

  //     dispatch(loginSuccess());
      if (data) {
        saveToken(data.token);
        history.push('/');

  //       saveUserRole(data.role);
  //       return dispatch(loadCurrentUserData())
  //         .then(res => {
  //           // Should we send the user to set up his profile?
  //           if (!res.firstName || !res.lastName || !res.dateOfBirth) {
  //             history.push('/create-profile');
  //           } else {
  //             history.push('/');
  //           }
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         });
      }
    });
    // .catch(({ response }) => {
    // .catch((error) => {
    //   // dispatch(loginFail());
    //   // let data = { ...response.data };
    //   // if (data.statusCode === 400) {
    //   //   data.message = "Current login/password isn't correct";
    //   // }
    //   // throw new SubmissionError(normalizeErrors(data));
    //   console.log('LOGIN FAILED: ', error);
    // });
};

export default login;