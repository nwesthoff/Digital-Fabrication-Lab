package com.nilswesthoff.nils.digitalfabricationlab.Printers;

public class Printer {
    String id, name;
    String brand;
    Boolean online;

    public Printer() {

    }

    public Printer(String key, String name, String brand, Boolean online) {
        this.name = name;
        this.brand = brand;
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

    public String getBrand() {
        return brand;
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
