package com.nilswesthoff.nils.digitalfabricationlab.Printers;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;
import java.util.List;

public class PrinterTabFragment extends Fragment {
    private static final String TAG = "PrinterTabFragment";
    private RecyclerView recyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mlayoutManager;
    public FirebaseFirestore db;
    private List<Printer> Printers;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_printers, container, false);

        db = FirebaseFirestore.getInstance();

        // Init RecyclerView
        recyclerView = view.findViewById(R.id.printer_recycler);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mlayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(mlayoutManager);

        Printers = new ArrayList<>();
        readData(new PrinterTabFragment.FirestoreCallback() {
            @Override
            public void onCallback(List<Printer> printers) {
                // specify an adapter (see also next example)
                mAdapter = new PrinterAdapter(printers, getContext());
                recyclerView.setAdapter(mAdapter);
            }
        });

        return view;
    }

    private void readData(final PrinterTabFragment.FirestoreCallback firestoreCallback) {
        CollectionReference PrintersRef = db.collection("Printers");
        PrintersRef.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Printer printer = document.toObject(Printer.class);
                        Printers.add(printer);
                    }
                    firestoreCallback.onCallback(Printers);
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });
    }

    private interface FirestoreCallback {
        void onCallback(List<Printer> printers);
    }
}
