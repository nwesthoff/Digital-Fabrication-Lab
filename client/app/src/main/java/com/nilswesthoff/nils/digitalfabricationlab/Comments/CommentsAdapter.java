package com.nilswesthoff.nils.digitalfabricationlab.Comments;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;
import com.nilswesthoff.nils.digitalfabricationlab.Profile.Users.User;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;

public class CommentsAdapter extends RecyclerView.Adapter<CommentsAdapter.CommentViewHolder> {
    private ArrayList<Comment> mCommentList;
    private Context mContext;
    private FirebaseUser currentUser;


    public static class CommentViewHolder extends RecyclerView.ViewHolder {
        public ImageView image_profile;
        public TextView fullname, comment;


        public CommentViewHolder(View itemView) {
            super(itemView);

            image_profile = itemView.findViewById(R.id.image_profile);
            fullname = itemView.findViewById(R.id.fullname);
            comment = itemView.findViewById(R.id.comment);
        }
    }

    public CommentsAdapter(ArrayList<Comment> commentList) {
        mCommentList = commentList;
    }

    @Override
    public CommentViewHolder onCreateViewHolder(ViewGroup viewGroup, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.comment_item, viewGroup, false);
        return new CommentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(CommentViewHolder viewHolder, int i) {
        currentUser = FirebaseAuth.getInstance().getCurrentUser();
        final Comment comment = mCommentList.get(i);

        viewHolder.comment.setText(comment.getComment());
        getUserinfo(viewHolder.image_profile, viewHolder.fullname, comment.getPublisher());

        viewHolder.comment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, MainActivity.class); //TODO: Zoek goede activity https://www.youtube.com/watch?v=V2lai8cJIkk.
                intent.putExtra("publisherid", comment.getPublisher());
                mContext.startActivity(intent);
            }
        });

        viewHolder.image_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, MainActivity.class); //TODO: Zoek goede activity https://www.youtube.com/watch?v=V2lai8cJIkk.
                intent.putExtra("publisherid", comment.getPublisher());
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return mCommentList.size();
    }


    private void getUserinfo(final ImageView imageView, final TextView fullname, String publisherid) {
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference().child("Users").child(publisherid);

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                User user = dataSnapshot.getValue(User.class);
                Glide.with(mContext).load(user.getImageurl()).into(imageView);
                fullname.setText(user.getFullname());

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }
}
