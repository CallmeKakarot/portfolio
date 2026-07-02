package com.hospital.timepass.service;

import com.hospital.timepass.dto.ContactRequest;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log= LoggerFactory.getLogger(EmailService.class);

    @Value("${resend.api.key}")
    private  String resendApiKey;

    @Value("${app.contact.recipient-email}")
    private String recipientEmail;

    public void sendContactEmail(ContactRequest request){
        log.info("Received contact form submission form: { }", request.getEmail());

        Resend resend=new Resend(resendApiKey);

        CreateEmailOptions params= CreateEmailOptions.builder()
                .from("onboarding@resend.dev")
                .to(recipientEmail)
                .replyTo(request.getEmail())
                .subject("Portfolio Contact: "+request.getSubject())
                .text(
                        "You recieved a new message from your website.\n\n"+
                                "Name   : " + request.getFullName() + "\n"+
                                "Email   : " + request.getEmail() + "\n"+
                                "Subject   : " + request.getSubject() + "\n"+
                                "Message   : " + request.getMessage() + "\n"
                )
                .build();
        try{
            CreateEmailResponse data = resend.emails().send(params);
            log.info("Email sent successfully. Resend ID: {}", data.getId());
        }
        catch(ResendException e){
            log.error("Error sending email from: {}. Reason: {}", request.getEmail(), e.getMessage());
            throw new RuntimeException("Failed to send email",  e);
        }
    }

}
