package com.nilswesthoff.nils.digitalfabricationlab.Orders;

public class OrderItem {
    private String mTitle;
    private String mDescription;
    private Long mStatus;

    public OrderItem() {

    }

    public OrderItem(String title, String description, Long status) {
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

    public String getStatusString() {
        if (mStatus != null) {
            long l = mStatus;
            int i = (int) l;


            switch (i) {
                case 0:
                    return "ordered";
                case 1:
                    return "accepted";
                case 2:
                    return "printing";
                case 3:
                    return "done";
                default:
                    return "";
            }
        } else {
            return "status unknown";
        }
    }

    // TODO: fix status getter/setter
    public void setStatus(Long status) {
        mStatus = status;
    }

    public String getDescription() {
        return mDescription;
    }

    public void setDescription(String description) {
        mDescription = description;
    }
}
