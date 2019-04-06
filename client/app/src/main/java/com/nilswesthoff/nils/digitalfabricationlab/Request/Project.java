package com.nilswesthoff.nils.digitalfabricationlab.Request;

public class Project {
    private String title;
    private String description;
    private String printer;
    private String course;
    private String baan;

    public Project(String titel, String description, String printer, String course, String baan) {
        this.title = titel;
        this.printer = printer;
        this.description = description;
        this.course = course;
        this.baan = baan;
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

    public String getPrinter() {
        return printer;
    }
}
