package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.FirebaseFirestore;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.HashMap;
import java.util.Map;

public class OrderTEST extends AppCompatActivity {

    private static final String TAG = "OrderTEST";
    private static final String KEY_TITLE = "title";
    private static final String KEY_DESCRIPTION = "description";


    private EditText project_titel, description_test;
    private Button confirm;

    private FirebaseFirestore db = FirebaseFirestore.getInstance();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order_test);

        //databaseReference = FirebaseDatabase.getInstance().getReference("projectsTEST");

        project_titel = (EditText) findViewById(R.id.project_titel);
        description_test = (EditText) findViewById(R.id.description_test);

        confirm = (Button) findViewById(R.id.confirm);

        //confirm.setOnClickListener(new View.OnClickListener() {
        //    @Override
        //    public void onClick(View v) {
        //        confirmProject();
        //    }
        //});
    }

    public void confirmProject(){
        String projectTitel = project_titel.getText().toString();
        String projectDescription = description_test.getText().toString();

        Map<String, Object> project = new HashMap<>();
        project.put(KEY_TITLE, projectTitel);
        project.put(KEY_DESCRIPTION, projectDescription);

        db.collection("Project Orders").document("My First Project").set(project)
                .addOnSuccessListener(new OnSuccessListener<Void>() {
                    @Override
                    public void onSuccess(Void aVoid) {
                        Toast.makeText(OrderTEST.this, "Project saved", Toast.LENGTH_SHORT).show();

                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Toast.makeText(OrderTEST.this, "Error", Toast.LENGTH_SHORT).show();
                        Log.d(TAG, e.toString());

                    }
                });

        //if (!TextUtils.isEmpty(projectTitel) && !TextUtils.isEmpty(projectDescription)){

            //String id = mRootRef.push().getKey();

            //Project project;
            //project = new Project(id, projectTitel, projectDescription);

            //mRootRef.child(id).setValue(project);
            //project_titel.setText("");
            //description_test.setText("");

        //}
        //else{
        //    Toast.makeText(OrderTEST.this, "Please enter Title and/or description",Toast.LENGTH_SHORT).show();
        //}
    }
}
