package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.nilswesthoff.nils.digitalfabricationlab.R;

public class Tab1Fragment extends Fragment {
    private static final String TAG = "Tab1Fragment";

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_requests, container, false);

        FloatingActionButton makeRequest = view.findViewById(R.id.makeRequest);
        makeRequest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(getActivity(), Order.class);
                startActivity(in);
            }
        });

        return view;
    }


}
