const login = ({ email, password }) => dispatch => {
  console.log('>>>>>>>> LOGIN >>>>>>', email, password);
  // dispatch(loginRequest());
  // return loginUser(email, password)
  //   .then(({ data }) => {
  //     if (data && data.is2fa) {
  //       dispatch({
  //         type: SET_TWOFA_TOKEN,
  //         payload: {
  //           token: data.token,
  //           expires: data.expires,
  //         },
  //       });
  //       return data;
  //     }
  //     dispatch(loginSuccess());
  //     if (data) {
  //       saveToken(data.token);
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
  //     }
  //   })
  //   .catch(({ response }) => {
  //     dispatch(loginFail());
  //     let data = { ...response.data };
  //     if (data.statusCode === 400) {
  //       data.message = "Current login/password isn't correct";
  //     }
  //     throw new SubmissionError(normalizeErrors(data));
  //   });
};

export default login;