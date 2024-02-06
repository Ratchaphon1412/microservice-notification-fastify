

export function sendNotification(nodemailer,from ,to,subject,html){

    
    nodemailer.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html,
    })
}