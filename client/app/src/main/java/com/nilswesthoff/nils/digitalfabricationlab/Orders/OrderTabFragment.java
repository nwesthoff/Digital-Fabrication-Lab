package com.nilswesthoff.nils.digitalfabricationlab.Orders;

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
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;
import java.util.List;

public class OrderTabFragment extends Fragment {
    private static final String TAG = "OrderTabFragment";
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mlayoutManager;
    public FirebaseFirestore db;
    private List<OrderItem> Orders;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final View view = inflater.inflate(R.layout.fragment_requests, container, false);
        final TextView sectionLabel = view.findViewById(R.id.section_label);

        FloatingActionButton makeRequest = view.findViewById(R.id.makeRequest);
        makeRequest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(getActivity(), CreateOrderActivity.class);
                startActivity(in);
            }
        });

        db = FirebaseFirestore.getInstance();

        // Init RecyclerView
        recyclerView = view.findViewById(R.id.requestRecycler);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mlayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(mlayoutManager);

        Orders = new ArrayList<>();
        readData(new FirestoreCallback() {
            @Override
            public void onCallback(List<OrderItem> orders) {
                // specify an adapter (see also next example)
                mAdapter = new OrderAdapter(orders);
                recyclerView.setAdapter(mAdapter);

                if (orders.size() > 0) {
                    sectionLabel.setText("");
                }
            }
        });

        return view;
    }

    private void readData(final FirestoreCallback firestoreCallback) {
        CollectionReference OrdersRef = db.collection("Orders");
        OrdersRef.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        OrderItem order = document.toObject(OrderItem.class);
                        Orders.add(order);
                    }
                    firestoreCallback.onCallback(Orders);
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });
    }

    private interface FirestoreCallback {
        void onCallback(List<OrderItem> orders);
    }
}
