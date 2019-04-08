package com.nilswesthoff.nils.digitalfabricationlab.Printers;

public class Printer {
    String id, name;
    Boolean online;

    public Printer() {

    }

    public Printer(String key, String name, Boolean online) {
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
        return getName();
    }

    public Printer withId(String id) {
        this.id = id;
        return this;
    }
}
