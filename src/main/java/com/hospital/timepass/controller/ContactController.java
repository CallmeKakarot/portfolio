package com.hospital.timepass.controller;


import com.hospital.timepass.dto.ContactRequest;
import com.hospital.timepass.service.EmailService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "https://www.sushil-poudel.com.np")

public class ContactController {

    private static final Logger log= LoggerFactory.getLogger(ContactController.class);

    private final EmailService emailService;
    public ContactController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>>submitContactForm(@Valid @RequestBody ContactRequest request){
        log.info("Contact form request received from: {}", request.getEmail());           // ADD

        emailService.sendContactEmail(request);
        log.info("Contact form processed successfully for: {}", request.getEmail());      // ADD

        return ResponseEntity.ok(Map.of("message", "Your message has been sent to succesfully!"));
    }

}
