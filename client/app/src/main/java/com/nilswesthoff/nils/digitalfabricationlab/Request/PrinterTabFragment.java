package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.nilswesthoff.nils.digitalfabricationlab.R;

public class PrinterTabFragment extends Fragment {
    private static final String TAG = "PrinterTabFragment";

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_printers,container,false);
        return view;
    }
}
