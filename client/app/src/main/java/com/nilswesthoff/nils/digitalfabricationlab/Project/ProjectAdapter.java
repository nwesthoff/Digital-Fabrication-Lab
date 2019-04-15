package com.nilswesthoff.nils.digitalfabricationlab.Project;

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
import com.nilswesthoff.nils.digitalfabricationlab.Project.Comments.CommentsActivity;
import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.Users.User;

import java.util.List;

public class ProjectAdapter extends RecyclerView.Adapter<ProjectAdapter.ViewHolder>{

    public Context mContext;
    public List<ProjectItem> mProjectItem;

    private FirebaseUser currentUser;


    public ProjectAdapter(Context mContext, List<ProjectItem> mProjectItem) {
        this.mContext = mContext;
        this.mProjectItem = mProjectItem;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i){
        View view = LayoutInflater.from(mContext).inflate(R.layout.postitem, viewGroup, false);
        return new ProjectAdapter.ViewHolder(view);

    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder viewHolder, int i){

        currentUser=FirebaseAuth.getInstance().getCurrentUser();
        final ProjectItem projectItem = mProjectItem.get(i);

        Glide.with(mContext).load(projectItem.getPostimage()).into(viewHolder.post_image);

        if (projectItem.getDescription().equals("")){
            viewHolder.description.setVisibility(View.GONE);
        } else {
            viewHolder.description.setVisibility(View.VISIBLE);
            viewHolder.description.setText(projectItem.getDescription());
        }
        publisherInfo(viewHolder.image_profile, viewHolder.fullname,viewHolder.publisher, projectItem.getPublisher());
        isLiked(projectItem.getPostid(), viewHolder.like);
        nrLikes(viewHolder.likes, projectItem.getPostid());
        getComments(projectItem.getPostid(), viewHolder.comments);


        viewHolder.like.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(viewHolder.like.getTag().equals("like")){
                    FirebaseDatabase.getInstance().getReference().child("Likes").child(projectItem.getPostid())
                            .child(currentUser.getUid()).setValue(true);
                } else {
                    FirebaseDatabase.getInstance().getReference().child("Likes").child(projectItem.getPostid())
                            .child(currentUser.getUid()).removeValue();
                }
            }
        });

        viewHolder.comment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(mContext, CommentsActivity.class);
                intent.putExtra("postid", projectItem.getPostid());
                intent.putExtra("publisherid", projectItem.getPublisher());
                mContext.startActivity(intent);
            }
        });

        viewHolder.comments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=new Intent(mContext, CommentsActivity.class);
                intent.putExtra("postid", projectItem.getPostid());
                intent.putExtra("publisherid", projectItem.getPublisher());
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount(){
        return mProjectItem.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder{

        public ImageView image_profile, post_image, like, comment, save;
        public TextView fullname, likes, publisher, description, comments;

        public ViewHolder(View itemView) {
            super(itemView);

            image_profile=itemView.findViewById(R.id.image_profile);
            post_image=itemView.findViewById(R.id.post_image);
            like=itemView.findViewById(R.id.like);
            comment=itemView.findViewById(R.id.comment);
            save=itemView.findViewById(R.id.save);
            fullname=itemView.findViewById(R.id.fullname);
            likes=itemView.findViewById(R.id.likes);
            publisher=itemView.findViewById(R.id.publisher);
            description=itemView.findViewById(R.id.description);
            comments=itemView.findViewById(R.id.comments);
        }
    }

    private void getComments(String postid, final TextView comments){
        DatabaseReference reference=FirebaseDatabase.getInstance().getReference().child("comments").child(postid);

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                comments.setText("View all " +dataSnapshot.getChildrenCount()+" Comments");
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void isLiked (String postid, final ImageView imageView ){

        final FirebaseUser currentUser = FirebaseAuth.getInstance().getCurrentUser();

        DatabaseReference reference=FirebaseDatabase.getInstance().getReference()
                .child("likes")
                .child(postid);

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if(dataSnapshot.child(currentUser.getUid()).exists()){
                    imageView.setImageResource(R.drawable.ic_liked);
                    imageView.setTag("liked");
                } else {
                    imageView.setImageResource(R.drawable.ic_like);
                    imageView.setTag("Like");

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void nrLikes(final TextView likes, String postid){
        DatabaseReference reference=FirebaseDatabase.getInstance().getReference().child("Likes")
                .child(postid);
        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                likes.setText(dataSnapshot.getChildrenCount()+"Likes");
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void publisherInfo(ImageView image_profile, final TextView fullname, final TextView publisher, String userid) {
        DatabaseReference reference= FirebaseDatabase.getInstance().getReference("Users").child(userid);

        reference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                User user=dataSnapshot.getValue(User.class);
                Glide.with(mContext).load(user.getImageurl());
                //TODO wij hebben geen User met volgers, heb nu de tutorial gevolgd maar moeten dit nog even uitzoeken hoe we alles wat geupload wordt laten zien.
                //https://www.youtube.com/watch?v=mk2CrU-awkM&list=PLzLFqCABnRQduspfbu2empaaY9BoIGLDM&index=7
                fullname.setText(user.getFullname());
                publisher.setText(user.getFullname());
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

    }


}
