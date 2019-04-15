package com.nilswesthoff.nils.digitalfabricationlab.Project;

public class ProjectItem {
    private String postid;
    private String title;
    private String projectImage;
    private String description;
    private String publisher;

    public ProjectItem(String postid, String title, String projectImage, String description, String publisher) {
        this.postid = postid;
        this.title = title;
        this.projectImage = projectImage;
        this.description = description;
        this.publisher = publisher;
    }

    public ProjectItem() {
    }

    public String getPostid() {
        return postid;
    }

    public void setPostid(String postid) {
        this.postid = postid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String postid) {
        this.title = title;
    }

    public String getProjectImage() {
        return projectImage;
    }

    public void setProjectImage(String projectImage) {
        this.projectImage = projectImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
}
