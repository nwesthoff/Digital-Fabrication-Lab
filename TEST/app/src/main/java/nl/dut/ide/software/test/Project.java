package nl.dut.ide.software.test;

public class Project {
    private String projectId;
    private String projecTitel;
    //private String Machine;
    private String ProjectDescription;
    //private String PaymentMethod;
    //String Baancode;


    public Project() {

    }

    public Project(String projectId, String projectTitel, String projectDescription){
        this.projectId = projectId;
        this.projecTitel = projectTitel;
        ProjectDescription = projectDescription;
    }

    public String getProjectId() {
        return projectId;
    }

    public String getProjecTitel() {
        return projecTitel;
    }

    public String getProjectDescription() {
        return ProjectDescription;
    }
}

