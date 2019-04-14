package com.nilswesthoff.nils.digitalfabricationlab.Project.Comments;

public class Comment {

    private String mComment;
    private String mPublisher;

    public Comment(String comment, String publisher) {
        mComment = comment;
        mPublisher = publisher;
    }

    public Comment() {
    }

    public String getComment() {
        return mComment;
    }

    public void setComment(String comment) {
        mComment = comment;
    }

    public String getPublisher() {
        return mPublisher;
    }

    public void setPublisher(String publisher) {
        mPublisher = publisher;
    }
}
