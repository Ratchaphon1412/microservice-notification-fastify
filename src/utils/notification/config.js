

export const mailConfig = {
    pool: true,
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    service: process.env.MAIL_SERVICE || 'gmail',
    port: process.env.MAIL_PORT || 465,
    secure: true, // use TLS
    auth: {
        user: process.env.MAIL_USER || 'user',
        pass: process.env.MAIL_PASS || 'pass'
    }
}