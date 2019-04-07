package com.nilswesthoff.nils.digitalfabricationlab.Printers;

public class Printer {
    String id, name;
    Boolean online;

    public Printer() {

    }

    public Printer(String id, String name, Boolean online) {
        this.id = id;
        this.name = name;
        this.online = online;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Boolean getOnline() {
        return online;
    }

    @Override
    public String toString() {
        return getName(); // You can add anything else like maybe getDrinkType()
    }
}
