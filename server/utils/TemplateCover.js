const EmailCover = (body) => {
  return (
    `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aglogor Team</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFF0CA; color: #3A1500;">
    <!-- Header -->

    <!-- Body -->
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-top: 20px; border: 1px solid #FFD700; background-color: #FFF;">
        <tr>
            <td style="padding: 20px;">` +
    body +
    `
    </td>
        </tr>
    </table>

    <!-- Footer -->
</body>
</html>
`
  );
};

const EmailTextCover = (text) => {
  return ``;
};

module.exports = { EmailCover, EmailTextCover };
