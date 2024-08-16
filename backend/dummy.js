const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // or 587 for TLS
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ramaraok828@gmail.com',
        pass: "szzbfiglzczwsnmu"
    }
});

const options = {
    from: "ramaraok828@gmail.com",
    to: "kalingaramarao181@gmail.com",
    subject: "Testing Mail",
    text: "Check my mail"
};

transporter.sendMail(options, function (err, success) {
    if (err) {
        console.log(err);
    } else {
        console.log("Running..");
    }
});
