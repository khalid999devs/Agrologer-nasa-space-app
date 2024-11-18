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
  //update settings
  UPDATE_SETTINGS: '/api/setting/update', //put

  //dashboard
  GET_DASHBOARD: '/api/dashboard/get', //get with dashboardId params
  UPDATE_DASHBOARD: '/api/dashboard/update', //put

  //alerts
  GET_ALERTS: '/api/alerts/get', //get
  UPDATE_ALERTS: '/api/alerts/update', //put

  //device
  GET_AGROLYZER: '/api/agrolyzer/get', //get
  SEND_DEVICE_REQUEST: '/api/users/send-device-request', //post

  //community
  GET_DISCUSSIONS: '/api/discussions/get', //post
  SEND_DISCUSSION: '/api/discussions/add', //post
  REMOVE_DISCUSSION: '/api/discussions/remove', //delete /:discussionId
};
