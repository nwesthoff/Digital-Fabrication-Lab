package com.nilswesthoff.nils.digitalfabricationlab.Orders;

import com.google.firebase.firestore.DocumentReference;
import com.nilswesthoff.nils.digitalfabricationlab.Users.User;

import java.util.Date;
import java.util.Map;

public class OrderRequest {
    private String title;
    private String description;
    private DocumentReference printer;
    private String course;
    private String baan;
    private Date date;
    private String status;
    private User user;
    private Map<String, Object> files;

    public OrderRequest(String title, String description, DocumentReference printer, String course, String baan, Date date, String status, User user, Map<String, Object> files) {
        this.title = title;
        this.printer = printer;
        this.description = description;
        this.course = course;
        this.baan = baan;
        this.date = date;
        this.status = status;
        this.user = user;
        this.files = files;
    }

    public String getTitle() {
        return title;
    }

    public String getBaan() {
        return baan;
    }

    public Map<String, Object> getFiles() {
        return files;
    }

    public String getCourse() {
        return course;
    }

    public String getDescription() {
        return description;
    }

    public Date getDate() {
        return date;
    }

    public DocumentReference getPrinter() {
        return printer;
    }

    public String getStatus() {
        return status;
    }

    public User getUser() {
        return user;
    }
}
