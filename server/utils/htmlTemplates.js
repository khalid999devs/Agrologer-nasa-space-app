const htmlCreator = (mode, data) => {
  let subject = data?.info?.subject,
    body = data?.info?.body;
  text = data?.info?.text;

  let client = data.client;

  if (mode === 'newsletter') {
    subject = subject;
    body = `<p>Newsletter body</p>`;
  } else if (mode === 'contact') {
    subject = `We are here for you!`;
    body = `<p style="color: #3A1500; margin: 0;">Dear ${client.fullName},</p>
       <p style="color: #3A1500; margin: 20px 0;">${data.info.body}</p>
    `;
  } else if (mode === 'custom') {
    subject = subject;
    body = `<p style="color: #3A1500; margin: 0;">Dear ${client.fullName},</p>
    <p style="color: #3A1500; margin: 20px 0;">${data.info.body}</p>`;
  }

  return { subject, body, text };
};

module.exports = { htmlCreator };
