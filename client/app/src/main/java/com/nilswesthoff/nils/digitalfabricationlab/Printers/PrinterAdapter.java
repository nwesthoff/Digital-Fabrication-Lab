package com.nilswesthoff.nils.digitalfabricationlab.Printers;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.List;

public class PrinterAdapter extends RecyclerView.Adapter<PrinterAdapter.PrinterViewHolder> {
    private List<Printer> mPrinterList;
    private Context context;

    public static class PrinterViewHolder extends RecyclerView.ViewHolder {
        public TextView mPrinterModel;
        public TextView mPrinterBrand;
        public ImageView mPrinterStatus;

        public PrinterViewHolder(View itemView) {
            super(itemView);

            mPrinterModel = itemView.findViewById(R.id.printer_model);
            mPrinterBrand = itemView.findViewById(R.id.printer_brand);
            mPrinterStatus = itemView.findViewById(R.id.printer_status);
        }
    }

    public PrinterAdapter(List<Printer> printerList, Context context) {
        mPrinterList = printerList;
        this.context = context;
    }

    @Override
    public PrinterViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.fragment_printer_item, parent, false);

        return new PrinterViewHolder(v);
    }

    @Override
    public void onBindViewHolder(PrinterViewHolder holder, int position) {
        Printer currentItem = mPrinterList.get(position);

        holder.mPrinterModel.setText(currentItem.getName());
        holder.mPrinterBrand.setText(currentItem.getBrand());
        if (currentItem.getOnline()) {
            holder.mPrinterStatus.setImageDrawable(context.getResources().getDrawable(R.drawable.green_circle));
        } else {
            holder.mPrinterStatus.setImageDrawable(context.getResources().getDrawable(R.drawable.red_circle));
        }
    }

    @Override
    public int getItemCount() {
        return mPrinterList.size();
    }
}
