package com.nilswesthoff.nils.digitalfabricationlab.Orders;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.List;

public class OrderAdapter extends RecyclerView.Adapter<OrderAdapter.OrderViewHolder> {
    private List<OrderItem> mOrderList;

    public static class OrderViewHolder extends RecyclerView.ViewHolder {
        public TextView mOrderHeadline;
        public TextView mOrderSubheading;
        public TextView mOrderStatus;

        public OrderViewHolder(View itemView) {
            super(itemView);

            mOrderHeadline = itemView.findViewById(R.id.orderTextHeadline);
            mOrderSubheading = itemView.findViewById(R.id.orderTextSubheading);
            mOrderStatus = itemView.findViewById(R.id.orderTextStatus);
        }
    }

    public OrderAdapter(List<OrderItem> orderList) {
        mOrderList = orderList;
    }

    @Override
    public OrderViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.request_item, parent, false);

        return new OrderViewHolder(v);
    }

    @Override
    public void onBindViewHolder(OrderViewHolder holder, int position) {
        OrderItem currentItem = mOrderList.get(position);

        holder.mOrderHeadline.setText(currentItem.getTitle());
        holder.mOrderSubheading.setText(currentItem.getDescription());
        holder.mOrderStatus.setText(currentItem.getStatus());
    }

    @Override
    public int getItemCount() {
        return mOrderList.size();
    }
}
