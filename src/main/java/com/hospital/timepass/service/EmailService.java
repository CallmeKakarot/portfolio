package com.hospital.timepass.service;

import com.hospital.timepass.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log= LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${app.contact.recipient-email}")
    private String recipientEmail;

    public EmailService(JavaMailSender mailSender){
        this.mailSender=mailSender;
    }

    public void sendContactEmail(ContactRequest request){
        log.info("Received contact form submission form: { }", request.getEmail());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setReplyTo(request.getEmail());
        message.setSubject("Portfolio Contact: "+ request.getSubject());
        message.setText(
                "You received a new message from your portfolio contact form.\n\n"+
                        "Name: "+request.getFullName()+"\n"+
                        "Email: "+request.getEmail()+"\n"+
                        "Subject: "+request.getSubject()+ "\n\n"+
                        "Message:\n"+ request.getMessage()
        );
        try{
            mailSender.send(message);
            log.info("Email successfully sent to: {}", recipientEmail);
        }
        catch(Exception e){
            log.error("Error sending email from: {}. Reason: {}", request.getEmail(), e.getMessage());
            throw e;
        }
    }

}
