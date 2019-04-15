package com.nilswesthoff.nils.digitalfabricationlab.Users;

public class User {

    private String id;
    private String email;
    private String fullname;
    private String studenttype;
    private String imageurl;
    private String bio;

    public User(String id, String fullname, String studenttype, String imageurl, String bio, String email) {
        this.id = id;
        this.fullname = fullname;
        this.studenttype = studenttype;
        this.imageurl = imageurl;
        this.bio = bio;
        this.email = email;
    }

    public User() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getStudenttype() {
        return studenttype;
    }

    public void setStudenttype(String studenttype) {
        this.studenttype = studenttype;
    }

    public String getImageurl() {
        return imageurl;
    }

    public void setImageurl(String imageurl) {
        this.imageurl = imageurl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {return  email;}

    public void setEmail(String email){this.email = email;}
}
