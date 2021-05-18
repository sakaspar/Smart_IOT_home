var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hamza.saadi@esprit.tn',
      pass: 'yourpwd'
    }
  });
  
  var mailOptions = {
    from: 'hamza.saadi@esprit.tn',
    to: 'saadihamza2020@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });