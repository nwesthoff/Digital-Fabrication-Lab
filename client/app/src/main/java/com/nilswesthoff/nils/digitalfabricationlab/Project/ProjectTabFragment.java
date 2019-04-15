package com.nilswesthoff.nils.digitalfabricationlab.Project;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;
import java.util.List;

public class ProjectTabFragment extends Fragment {
    private static final String TAG = "ProjectTabFragment";
    private RecyclerView recyclerView;
    private ProjectAdapter projectAdapter;
    private List<ProjectItem> projectItemList;
    private List<String> followingList;

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

        recyclerView = view.findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(getContext());
        linearLayoutManager.setReverseLayout(true);
        linearLayoutManager.setStackFromEnd(true);
        recyclerView.setLayoutManager(linearLayoutManager);
        projectItemList = new ArrayList<>();
        projectAdapter = new ProjectAdapter(getContext(), projectItemList);
        recyclerView.setAdapter(projectAdapter);

        checkfollowing();

        return view;

    }

    private void checkfollowing() {
        followingList = new ArrayList<>();

        final DatabaseReference reference = FirebaseDatabase.getInstance().getReference("Follow")
                .child(FirebaseAuth.getInstance().getCurrentUser().getUid())
                .child("Following");

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                followingList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    followingList.add(snapshot.getKey());
                }

                readPosts();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void readPosts() {
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference("Posts");

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                projectItemList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    ProjectItem projectItem = snapshot.getValue(ProjectItem.class);
                    for (String id : followingList) {
                        if (projectItem.getPublisher().equals(id)) {
                            projectItemList.add(projectItem);
                        }
                    }
                }

                projectAdapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }

        });
    }
}