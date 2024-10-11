export const serverOrigin = process.env.EXPO_PUBLIC_SERVER_URI;

export const reqFileWrapper = (src: any) => {
  if (!src) return null;
  else return serverOrigin + '/' + src;
};

export const validFileWrapper = (fileImg: any) => {
  if (typeof fileImg === 'object') {
    if (fileImg.name) {
      return window.URL.createObjectURL(fileImg);
    } else {
      return null;
    }
  } else {
    return reqFileWrapper(fileImg);
  }
};

export const reqs = {
  //user reg
  USER_REGISTRATION: '/api/users/register', //post
  USER_LOGIN: '/api/users/login', //post
  VERIFY_USER_OTP: '/api/users/otp-send', //post
  GET_VALID_USER: '/api/users/get-user', //get
  UPDATE_USER: '/api/users/update', //put
};
