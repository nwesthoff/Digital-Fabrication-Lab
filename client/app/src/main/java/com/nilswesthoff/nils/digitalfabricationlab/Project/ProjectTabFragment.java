package com.nilswesthoff.nils.digitalfabricationlab.Project;

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

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;
import java.util.List;

public class ProjectTabFragment extends Fragment {
    private static final String TAG = "ProjectTabFragment";
    private RecyclerView recyclerView;
    private List<ProjectItem> Projects;
    private RecyclerView.Adapter mAdapter;
    public FirebaseFirestore db;
    private RecyclerView.LayoutManager mlayoutManager;

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_showcase, container, false);

        FloatingActionButton makePost = view.findViewById(R.id.makePost);
        makePost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(getActivity(), CreateProjectActivity.class);
                startActivity(in);
            }
        });

        db = FirebaseFirestore.getInstance();


        // Init RecyclerView
        recyclerView = view.findViewById(R.id.project_recycler);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        recyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mlayoutManager = new LinearLayoutManager(getActivity());
        recyclerView.setLayoutManager(mlayoutManager);

        Projects = new ArrayList<>();
        readData(new ProjectTabFragment.FirestoreCallback() {
            @Override
            public void onCallback(List<ProjectItem> projects) {
                // specify an adapter (see also next example)
                mAdapter = new ProjectAdapter(projects);
                recyclerView.setAdapter(mAdapter);
            }
        });

        return view;
    }

    private void readData(final ProjectTabFragment.FirestoreCallback firestoreCallback) {

        CollectionReference ProjectsRef = db.collection("Projects");
        Query query = ProjectsRef;

        query.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        ProjectItem project = document.toObject(ProjectItem.class);
                        Projects.add(project);
                    }
                    firestoreCallback.onCallback(Projects);
                } else {
                    Log.d(TAG, "Error getting documents: ", task.getException());
                }
            }
        });
    }

    private interface FirestoreCallback {
        void onCallback(List<ProjectItem> projects);
    }
}