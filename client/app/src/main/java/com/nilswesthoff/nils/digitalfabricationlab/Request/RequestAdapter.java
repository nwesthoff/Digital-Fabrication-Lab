package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;

public class RequestAdapter extends RecyclerView.Adapter<RequestAdapter.RequestViewHolder> {
    private ArrayList<RequestItem> mRequestList;

    public static class RequestViewHolder extends RecyclerView.ViewHolder {
        public ImageView mImageView;
        public TextView mOrderHeadline;
        public TextView mOrderSubheading;

        public RequestViewHolder(View itemView) {
            super(itemView);

            mImageView = itemView.findViewById(R.id.orderImageView);
            mOrderHeadline = itemView.findViewById(R.id.orderTextHeadline);
            mOrderSubheading = itemView.findViewById(R.id.orderTextSubheading);
        }
    }

    public RequestAdapter(ArrayList<RequestItem> requestList) {
        mRequestList = requestList;

    }

    @Override
    public RequestViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.request_item, parent, false);

        return new RequestViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RequestViewHolder holder, int position) {
        RequestItem currentItem = mRequestList.get(position);
        holder.mImageView.setImageResource(currentItem.getmImageResource());
        holder.mOrderHeadline.setText(currentItem.getmOrderTextHeadline());
        holder.mOrderSubheading.setText(currentItem.getmOrderTextSubheading());
    }

    @Override
    public int getItemCount() {
        return mRequestList.size();
    }
}
