package com.nilswesthoff.nils.digitalfabricationlab.Request;

public class RequestItem {
    private int mImageResource;
    private String mOrderTextHeadline;
    private String mOrderTextSubheading;

    public RequestItem(int imageResource, String orderTextHeadline, String orderTextSubheading){
        mImageResource = imageResource;
        mOrderTextHeadline = orderTextHeadline;
        mOrderTextSubheading = orderTextSubheading;
    }

    public int getmImageResource() {
        return mImageResource;
    }

    public String getmOrderTextHeadline(){
        return mOrderTextHeadline;
    }

    public String getmOrderTextSubheading(){
        return mOrderTextSubheading;
    }
}
