package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.RequestAdapter;

import java.util.ArrayList;

public class Tab1Fragment extends Fragment {
    private static final String TAG = "Tab1Fragment";
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mlayoutManager;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_requests, container, false);

        TextView sectionLabel = view.findViewById(R.id.section_label);

        FloatingActionButton makeRequest = view.findViewById(R.id.makeRequest);
        makeRequest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(getActivity(), OrderTEST.class);
                startActivity(in);
            }
        });

        /// DATA CREATED HERE, TODO: FILL WITH FIREBASE DATA
        ArrayList<RequestItem> requestItems = new ArrayList<>();
        requestItems.add(new RequestItem(R.drawable.upload_button, "Order 1", "Order 1 line 2"));
        requestItems.add(new RequestItem(R.drawable.upload_button, "Order 2", "Order 2 line 2"));
        requestItems.add(new RequestItem(R.drawable.upload_button, "Order 3", "Order 3 line 2"));


        // Init Recyclerview
        recyclerView = view.findViewById(R.id.requestRecycler);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mlayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(mlayoutManager);

//         specify an adapter (see also next example)
        mAdapter = new RequestAdapter(requestItems);
        recyclerView.setAdapter(mAdapter);

        if (requestItems.size() > 0) {
            sectionLabel.setText("");
        }

        return view;
    }


}
