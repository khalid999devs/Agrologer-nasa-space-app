const mobileResExp = new RegExp(/^(01[3-9]\d{8})$/);
const emailResExp = new RegExp(
  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
);

module.exports = {
  mobileResExp,
  emailResExp,
};
