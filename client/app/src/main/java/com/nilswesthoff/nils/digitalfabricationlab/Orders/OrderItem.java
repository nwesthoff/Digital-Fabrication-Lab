package com.nilswesthoff.nils.digitalfabricationlab.Orders;

public class OrderItem {
    private String mTitle;
    private String mDescription;
    private String mStatus;

    public OrderItem() {

    }

    public OrderItem(String title, String description, String status) {
        mTitle = title;
        mDescription = description;
        mStatus = status;
    }


    public String getTitle() {
        return mTitle;
    }

    public void setTitle(String title) {
        mTitle = title;
    }

    public String getStatus() {
        return mStatus;
    }

    // TODO: fix status getter/setter
    public void setStatus(String status) {
        mStatus = status;
    }

    public String getDescription() {
        return mDescription;
    }

    public void setDescription(String description) {
        mDescription = description;
    }
}
