package com.nilswesthoff.nils.digitalfabricationlab.Request;

public class Project {
    private String projectID;
    private String projecTitel;
    //private String Machine;
    private String projectDescription;
    //private String PaymentMethod;
    //String Baancode;


    public Project(String id, String projectTitel, String projectDescription) {

    }

    public Project(String projectID, String projecTitel) {
        this.projectID = projectID;
        this.projecTitel = projecTitel;
        this.projectDescription = projectDescription;
    }

    public String getProjectID() {
        return projectID;
    }

    public String getProjecTitel() {
        return projecTitel;
    }

    public String getProjectDescription() {
        return projectDescription;
    }
}
