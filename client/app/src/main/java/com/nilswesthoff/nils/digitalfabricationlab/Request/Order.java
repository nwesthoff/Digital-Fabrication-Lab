package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.nilswesthoff.nils.digitalfabricationlab.R;


public class Order extends AppCompatActivity {

    private static final int PICK_FILE_REQUEST = 234;

    EditText project_title;
    EditText description;
    EditText course_group;
    EditText baan_code;

    private Button chooseButton;
    private Button uploadButton;
    private Button confirmButton;


    private Uri filePath;

    private StorageReference storageReference;
    DatabaseReference databaseProjects;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        databaseProjects = FirebaseDatabase.getInstance().getReference("projects");

        //payment method dropdown TODO: Make 1st option grey, kind of done
        Spinner spinner_payment = (Spinner) findViewById(R.id.payment_method);
        ArrayAdapter<CharSequence> adapter_payment = ArrayAdapter.createFromResource(this,
                R.array.payment, android.R.layout.simple_spinner_item);
        adapter_payment.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_payment.setAdapter(adapter_payment);

        spinner_payment.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long l) {

                if (parent.getItemAtPosition(position).equals("Choose payment method")) {
                    //do nothing
                } else {
                    //on selecting spinner item
                    String item = parent.getItemAtPosition(position).toString();

                    //show selected spinner item
                    Toast.makeText(parent.getContext(), "Selected: " + item, Toast.LENGTH_SHORT).show();

                }
                //if we want to do something else with the selection, do it here

                if (parent.getItemAtPosition(position).equals("Baancode")) {
                    baan_code.setVisibility(View.VISIBLE);
                } else {
                    baan_code.setVisibility(View.INVISIBLE);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

                //TODO: Auto-generator method stub

            }
        });

        //choose machine dropdown TODO: Make 1st option grey/not // done
        Spinner spinner_machine = (Spinner) findViewById(R.id.choose_machine);
        ArrayAdapter<CharSequence> adapter_machine = ArrayAdapter.createFromResource(this,
                R.array.machine, android.R.layout.simple_spinner_item);
        adapter_machine.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_machine.setAdapter(adapter_machine);

        spinner_machine.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent2, View view, int position, long l) {

                if (parent2.getItemAtPosition(position).equals("Choose machine")) {
                    //do nothing
                } else {
                    //on selecting spinner item
                    String item = parent2.getItemAtPosition(position).toString();

                    //show selected spinner item
                    Toast.makeText(parent2.getContext(), "Selected: " + item, Toast.LENGTH_SHORT).show();

                    //if we want to do something else with the selection, do it here
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

                //TODO: Auto-generater method stub

            }
        });

        storageReference = FirebaseStorage.getInstance().getReference();

        project_title = (EditText) findViewById(R.id.project_title);
        chooseButton = (Button) findViewById(R.id.choose_button);
        uploadButton = (Button) findViewById(R.id.upload_button);
        description = (EditText) findViewById(R.id.description);
        course_group = (EditText) findViewById(R.id.course_group);
        confirmButton = (Button) findViewById(R.id.confirm_button);
        baan_code = (EditText) findViewById((R.id.baan_code));


        // TODO: upload button uploads the WHOLE project to Firebase, including title etc.

        chooseButton.setOnClickListener(this);
        uploadButton.setOnClickListener(this);

        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                filledIn();
            }
        });
    }

        private void showFileChooser() {
            Intent intent = new Intent();
            intent.setType("files/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select file"), PICK_FILE_REQUEST);
        }

        private void uploadFile() {

        //TODO: show that you selected a file

        if (filePath != null) {

        final ProgressDialog progressDialog = new ProgressDialog(this);
        progressDialog.setTitle("Uploading...");
        progressDialog.show();

        //TODO: file title = real file name instead of "projects.jpg"
        //TODO: get Firebase location back

        StorageReference riversRef = storageReference.child("files/");

        riversRef.putFile(filePath)
                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        progressDialog.dismiss();
                        Toast.makeText(getApplicationContext(), "File Uploaded", Toast.LENGTH_LONG).show();
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception exception) {
                        progressDialog.dismiss();
                        Toast.makeText(getApplicationContext(), exception.getMessage(), Toast.LENGTH_LONG).show();
                    }
                })
                .addOnProgressListener(new OnProgressListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
                        double progress = (100.0 * taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
                        progressDialog.setMessage(((int) progress) + "% Uploaded...");
                    }
                });

        } else {
        //display an error toast
        //TODO: Upload error when there are empty fields
        }
        }

        @Override
        protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if (requestCode == PICK_FILE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
        }
        }

        @Override
        public void onClick(View view) {
            if (view == chooseButton) {
                //open file chooser
                showFileChooser();
            } else if (view == uploadButton) {
                //upload to firebase storage
                uploadFile();
            }
        }

        private void filledIn () {
            String title = project_title.getText().toString().trim();
            //String Machine = choose_machine.getSelectedItem().toString();
            String Description = description.getText().toString().trim();
            String course = course_group.getText().toString().trim();
            String baan = baan_code.getText().toString().trim();

            if (!TextUtils.isEmpty(title)) {

                String id = databaseProjects.push().getKey();
                Project project = new Project(id, title, Description, course, baan);

                databaseProjects.child(id).setValue(project);
                //Toast.makeText(this, "Title added", Toast.LENGTH_LONG).show();

            } else {
                Toast.makeText(this, "Enter your Project Title", Toast.LENGTH_LONG).show();
            }
        }

}

