package com.nilswesthoff.nils.digitalfabricationlab.Project;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.io.InputStream;
import java.util.List;

public class ProjectAdapter extends RecyclerView.Adapter<ProjectAdapter.ProjectViewHolder> {
    private List<ProjectItem> mProjectList;

    public static class ProjectViewHolder extends RecyclerView.ViewHolder {
        public TextView mProjectDescription;
        public ImageView mProjectImage;

        public ProjectViewHolder(View itemView) {
            super(itemView);

            mProjectDescription = itemView.findViewById(R.id.project_description);
            mProjectImage = itemView.findViewById(R.id.project_image);
        }
    }

    public ProjectAdapter(List<ProjectItem> projectList) {
        mProjectList = projectList;
    }

    @Override
    public ProjectViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.postitem, parent, false);

        return new ProjectViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ProjectViewHolder holder, int position) {
        ProjectItem currentItem = mProjectList.get(position);

        holder.mProjectDescription.setText(currentItem.getDescription());
        new DownloadImageTask(holder.mProjectImage)
                .execute(currentItem.getProjectImage());
    }

    @Override
    public int getItemCount() {
        return mProjectList.size();
    }

    private class DownloadImageTask extends AsyncTask<String, Void, Bitmap> {
        ImageView bmImage;

        public DownloadImageTask(ImageView bmImage) {
            this.bmImage = bmImage;
        }

        protected Bitmap doInBackground(String... urls) {
            String urldisplay = urls[0];
            Bitmap mIcon11 = null;
            try {
                InputStream in = new java.net.URL(urldisplay).openStream();
                mIcon11 = BitmapFactory.decodeStream(in);
            } catch (Exception e) {
                Log.e("Error", e.getMessage());
                e.printStackTrace();
            }
            return mIcon11;
        }

        protected void onPostExecute(Bitmap result) {
            bmImage.setImageBitmap(result);
        }
    }
}
