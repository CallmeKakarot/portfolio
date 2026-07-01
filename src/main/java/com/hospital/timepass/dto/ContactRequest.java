package com.hospital.timepass.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactRequest {

    @NotBlank(message = "Full name is required")
    @Size(max=50, message = "Full name must be under 50 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "email must be valid")
    private String email;

    @NotBlank(message = "Subject is required")
    @Size(max=100, message = "Subject must be under 100 characters")
    private String subject;

    @NotBlank(message = "Message is required")
    @Size(max=2000, message = "Message must be under 2000 characters")
    private  String message;


    public String getFullName() {
        return fullName;
    }
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public  String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
