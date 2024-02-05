

export function sendNotification(nodemailer,from ,to,subject,text,html){

    
    nodemailer.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
    })
}