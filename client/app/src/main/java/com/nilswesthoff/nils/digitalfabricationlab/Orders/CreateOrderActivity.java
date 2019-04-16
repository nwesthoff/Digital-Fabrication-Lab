package com.nilswesthoff.nils.digitalfabricationlab.Orders;

import android.app.ProgressDialog;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.provider.OpenableColumns;
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

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;
import com.nilswesthoff.nils.digitalfabricationlab.Printers.Printer;
import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.Users.User;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class CreateOrderActivity extends AppCompatActivity implements View.OnClickListener {
    private static final int PICK_FILE_REQUEST = 234;

    EditText project_title;
    EditText description;
    private List<Printer> Printers;
    private ArrayAdapter<Printer> printerAdapter;
    EditText course_group;
    EditText baan_code;
    private String clickedPrinterId;

    private Button chooseButton;
    private static final String TAG = "CreateOrderActivity";

    // File uploads
    Uri localUri;
    String displayName = null;
    String path;
    Uri hostedUri;


    private StorageReference storageReference;
    public FirebaseFirestore db;

    //user
    private FirebaseAuth mAuth;
    public FirebaseUser currentUser;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        chooseButton = findViewById(R.id.choose_button);

        db = FirebaseFirestore.getInstance();
        storageReference = FirebaseStorage.getInstance().getReference();

        //get user id
        mAuth = FirebaseAuth.getInstance();
        currentUser = mAuth.getCurrentUser();

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
        Printers = new ArrayList<>();
        readData(new FirestoreCallback() {
            @Override
            public void onCallback(List<Printer> printers) {
                Spinner printerSpinner = findViewById(R.id.choose_machine);

                printerAdapter = new ArrayAdapter<>(CreateOrderActivity.this, android.R.layout.simple_spinner_item, printers);
                printerAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                printerSpinner.setAdapter(printerAdapter);

                printerSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                    @Override
                    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                        //on selecting spinner item
                        String item = parent.getItemAtPosition(position).toString();
                        clickedPrinterId = printerAdapter.getItem(position).getId();

                        //show selected spinner item
                        Toast.makeText(printerAdapter.getContext(), "Selected: " + item, Toast.LENGTH_SHORT).show();

                        //if we want to do something else with the selection, do it here
                    }

                    @Override
                    public void onNothingSelected(AdapterView<?> PrinterAdapter) {

                        //TODO: Auto-generator method stub

                    }
                });
            }
        });


        project_title = findViewById(R.id.project_title);
        description = findViewById(R.id.description);
        course_group = findViewById(R.id.course_group);
        Button confirmButton = findViewById(R.id.confirm_button);
        baan_code = findViewById((R.id.baan_code));


        // TODO: upload button uploads the WHOLE project to Firebase, including title etc.
        chooseButton.setOnClickListener(this);

        confirmButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                filledIn();
            }
        });
    }

    private void readData(final FirestoreCallback firestoreCallback) {
        CollectionReference PrintersRef = db.collection("Printers");
        PrintersRef.get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Printer printers = document.toObject(Printer.class).withId(document.getId());
                        if (printers.getOnline()) {
                            Printers.add(printers);
                        }
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

    private void showFileChooser() {
        Intent intent = new Intent();
        intent.setType("*/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent, "Select file"), PICK_FILE_REQUEST);
    }


    public void onClick(View view) {
        if (view == chooseButton) {
            //open file chooser
            showFileChooser();
        }
    }

    private void uploadFile() {

        //TODO: show that you selected a file

        if (localUri != null) {

            final ProgressDialog progressDialog = new ProgressDialog(this);
            progressDialog.setTitle("Uploading...");
            progressDialog.show();

            //TODO: file title = real file name instead of "projects.jpg"
            //TODO: get Firebase location back

            final StorageReference orderFile = storageReference.child("files/" + displayName);

            orderFile.putFile(localUri).addOnProgressListener(new OnProgressListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onProgress(UploadTask.TaskSnapshot taskSnapshot) {
                    double progress = (100.0 * taskSnapshot.getBytesTransferred() / taskSnapshot.getTotalByteCount());
                    progressDialog.setMessage(((int) progress) + "% Uploaded...");
                }
            }).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                @Override
                public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> taskSnapshot) throws Exception {


                    if (!taskSnapshot.isSuccessful()) {
                        throw taskSnapshot.getException();
                    }

                    // Continue with the task to get the download URL
                    return orderFile.getDownloadUrl();
                }
            }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                @Override
                public void onComplete(@NonNull Task<Uri> task) {
                    if (task.isSuccessful()) {
                        progressDialog.dismiss();
                        hostedUri = task.getResult();
                        Toast.makeText(getApplicationContext(), "File Uploaded", Toast.LENGTH_LONG).show();
                    } else {
                        progressDialog.dismiss();
                        Toast.makeText(getApplicationContext(), task.getException().getMessage(), Toast.LENGTH_LONG).show();
                    }
                }
            });

        } else {
            //display an error toast
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if (requestCode == PICK_FILE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            localUri = data.getData();
            String uriString = localUri.toString();
            File myFile = new File(uriString);
            path = myFile.getAbsolutePath();

            if (uriString.startsWith("content://")) {
                Cursor cursor = null;
                try {
                    cursor = CreateOrderActivity.this.getContentResolver().query(localUri, null, null, null, null);
                    if (cursor != null && cursor.moveToFirst()) {
                        displayName = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                    }
                } finally {
                    cursor.close();
                }
            } else if (uriString.startsWith("file://")) {
                displayName = myFile.getName();
            }
            uploadFile();
        }
    }

    private void filledIn() {
        DocumentReference printer = db.collection("Printers").document(clickedPrinterId);

        Date date = new Date();
        String email = currentUser.getEmail();
        User user = new User();
        user.setEmail(email);

        // Files
        Map<String, Object> file = new HashMap<>();
        file.put("fileName", displayName);
        file.put("fileUrl", hostedUri.toString());

        // Order Request
        Map<String, Object> orderRequest = new HashMap<>();
        orderRequest.put("title", project_title.getText().toString().trim());
        orderRequest.put("Description", description.getText().toString().trim());
        orderRequest.put("course", course_group.getText().toString().trim());
        orderRequest.put("baan", baan_code.getText().toString().trim());
        orderRequest.put("date", date);
        orderRequest.put("user", user);
        orderRequest.put("status", "ordered");
        orderRequest.put("files", Arrays.asList(file));
        orderRequest.put("printer", printer);

        if (!TextUtils.isEmpty(project_title.getText().toString().trim())) {

            db.collection("Orders").add(orderRequest).addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                @Override
                public void onSuccess(DocumentReference documentReference) {
                    Log.d(TAG, "DocumentSnapshot written with ID: " + documentReference.getId());
                    //Confirmation text
                    Toast.makeText(CreateOrderActivity.this, "CreateOrderActivity confirmed", Toast.LENGTH_LONG).show();

                    Intent intent1 = new Intent(CreateOrderActivity.this, MainActivity.class);
                    startActivity(intent1);
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception e) {
                    Log.w(TAG, "Error adding document", e);
                    //Confirmation text
                    Toast.makeText(CreateOrderActivity.this, "Error adding orderRequest", Toast.LENGTH_LONG).show();
                }
            });


        } else {
            Toast.makeText(this, "Enter your CreateOrderActivity Title", Toast.LENGTH_LONG).show();
        }


    }

}

