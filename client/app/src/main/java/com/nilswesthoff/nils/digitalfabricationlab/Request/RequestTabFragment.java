package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.RequestAdapter;

import java.util.ArrayList;

public class RequestTabFragment extends Fragment {
    private static final String TAG = "RequestTabFragment";
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mlayoutManager;
    public FirebaseFirestore db;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_requests, container, false);

        TextView sectionLabel = view.findViewById(R.id.section_label);

        FloatingActionButton makeRequest = view.findViewById(R.id.makeRequest);
        makeRequest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(getActivity(), Order.class);
                startActivity(in);
            }
        });

        db = FirebaseFirestore.getInstance();

        db.collection("orders")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                Log.d(TAG, document.getId() + " => " + document.getData());
                            }
                        } else {
                            Log.w(TAG, "Error getting documents.", task.getException());
                        }
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
