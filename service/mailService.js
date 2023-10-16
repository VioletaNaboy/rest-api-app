
const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor(email, url) {
        this.to = email;
        this.url = url;
        this.from = process.env.USER_EMAIL;
    }
 
    _initTransport() {
        return nodemailer.createTransport(
            {
                host: 'smtp.meta.ua',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASS_EMAIL,
                }
            });   
}    
   async _send(subject, text) {
         const emailOptions = {
  from: this.from,
  to: this.to,
  subject: subject,
  text: text,
        };
       await this._initTransport().sendMail(emailOptions)
           .then(info => console.log(info))
           .catch(err => console.log(err));;   
    }
    async verifyEmail() {
        await this._send('Verify email', `Hi! Click the link ${this.url} to verify your email :)`)
    }
}


module.exports = EmailService;
