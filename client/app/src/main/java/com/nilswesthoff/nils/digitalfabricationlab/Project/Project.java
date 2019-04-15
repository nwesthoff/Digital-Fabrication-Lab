package com.nilswesthoff.nils.digitalfabricationlab.Project;

import com.google.firebase.firestore.DocumentReference;

import java.util.Date;

public class Project {
    private String title;
    private String description;
    private DocumentReference printer;
    private String course;
    private String baan;
    private Date date;
    private Number status;

    public Project(String titel, String description, DocumentReference printer, String course, String baan, Date date, Number status) {
        this.title = titel;
        this.printer = printer;
        this.description = description;
        this.course = course;
        this.baan = baan;
        this.date = date;
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public String getBaan() {
        return baan;
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

    public Number getStatus() {
        return status;
    }
}
