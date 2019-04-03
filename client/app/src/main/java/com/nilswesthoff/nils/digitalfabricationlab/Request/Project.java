package com.nilswesthoff.nils.digitalfabricationlab.Request;

public class Project {
    private String ProjectId;
    private String ProjectTitle;
    private String Machine;
    private String Description;
    private String PaymentMethod;
    //String Baancode;

    public Project(String id, String title, String description, String course) {

    }

    public Project(String projectId, String projectTitle, String machine, String description, String paymentMethod, String baancode) {
        ProjectId = projectId;
        ProjectTitle = projectTitle;
        Machine = machine;
        Description = description;
        PaymentMethod = paymentMethod;
        //Baancode = baancode;
    }

    public String getProjectId() {
        return ProjectId;
    }

    public String getProjectTitle() {
        return ProjectTitle;
    }

    public String getMachine() {
        return Machine;
    }

    public String getDescription() {
        return Description;
    }

    public String getPaymentMethod() {
        return PaymentMethod;
    }

    //public String getBaancode() {
    //    return Baancode;
    //}
}
