package com.nilswesthoff.nils.digitalfabricationlab.Printers;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import java.util.List;

public class PrinterAdapter extends ArrayAdapter<Printer> {
    public PrinterAdapter(Context context,
                          List<Printer> printers) {
        super(context, 0, printers);
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        return initView(position, convertView, parent);
    }

    @Override
    public View getDropDownView(int position, @Nullable View convertView,
                                @NonNull ViewGroup parent) {
        return initView(position, convertView, parent);
    }

    private View initView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(android.R.layout.simple_spinner_dropdown_item, parent, false);
        }

        TextView textViewName = (TextView) super.getView(position, convertView, parent);
        Printer currentItem = getItem(position);

        if (textViewName != null) {
            textViewName.setTextColor(Color.BLACK);
            textViewName.setText(currentItem.getName());
        }

        return convertView;
    }


}
