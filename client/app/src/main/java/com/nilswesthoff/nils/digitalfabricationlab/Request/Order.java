package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.nilswesthoff.nils.digitalfabricationlab.R;

import java.util.ArrayList;
import java.util.List;


public class Order extends AppCompatActivity implements View.OnClickListener {

    private static final int PICK_FILE_REQUEST = 234;

    EditText project_title;
    EditText description;
    Spinner choose_machine;
    EditText course_group;
    EditText baan_code;

    private Button chooseButton, uploadButton;
    private Button confirmButton;
    private static final String TAG = "Order Activity";


    private Uri filePath;

    private StorageReference storageReference;
    public FirebaseFirestore db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        chooseButton = findViewById(R.id.choose_button);
        uploadButton = findViewById(R.id.upload_button);

        db = FirebaseFirestore.getInstance();
        storageReference = FirebaseStorage.getInstance().getReference();

        //payment method dropdown TODO: Make 1st option grey, kind of done
        Spinner spinner_payment = findViewById(R.id.payment_method);
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
        CollectionReference PrintersRef = db.collection("Printers");
        Spinner PrinterSpinner = findViewById(R.id.choose_machine);
        List<String> Printers = new ArrayList<>();
        ArrayAdapter<String> PrinterAdapter = new ArrayAdapter<>(getApplicationContext(), android.R.layout.simple_spinner_dropdown_item, Printers);
        PrinterAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        PrinterSpinner.setAdapter(PrinterAdapter);

        PrinterSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
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

                //TODO: Auto-generator method stub

            }
        });

        project_title = findViewById(R.id.project_title);
        description = findViewById(R.id.description);
        choose_machine = findViewById(R.id.choose_machine);
        course_group = findViewById(R.id.course_group);
        confirmButton = findViewById(R.id.confirm_button);
        baan_code = findViewById((R.id.baan_code));


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


    public void onClick(View view) {
        if (view == chooseButton) {
            //open file chooser
            showFileChooser();
        } else if (view == uploadButton) {
            uploadFile();
        }
    }

    private void uploadFile() {

        //TODO: show that you selected a file

        if (filePath != null) {

            final ProgressDialog progressDialog = new ProgressDialog(this);
            progressDialog.setTitle("Uploading...");
            progressDialog.show();

            //TODO: file title = real file name instead of "projects.jpg"
            //TODO: get Firebase location back

            StorageReference riversRef = storageReference.child("files/project.jpg");

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
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if (requestCode == PICK_FILE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            filePath = data.getData();
        }
    }

    private void filledIn() {
        String title = project_title.getText().toString().trim();
        String printer = choose_machine.getSelectedItem().toString();
        String Description = description.getText().toString().trim();
        String course = course_group.getText().toString().trim();
        String baan = baan_code.getText().toString().trim();


        if (!TextUtils.isEmpty(title)) {

            Project project = new Project(title, Description, printer, course, baan);

            db.collection("Orders").add(project).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                @Override
                public void onSuccess(DocumentReference documentReference) {
                    Log.d(TAG, "DocumentSnapshot written with ID: " + documentReference.getId());
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    Log.w(TAG, "Error adding document", e);
                }
            });

            //Confirmation text
            Toast.makeText(this, "Order confirmed", Toast.LENGTH_LONG).show();
//            Intent intent1 = new Intent(Order.this, Tab1Fragment.class);
//            startActivity(intent1);

        } else {
            Toast.makeText(this, "Enter your Order Title", Toast.LENGTH_LONG).show();
        }


    }

}

