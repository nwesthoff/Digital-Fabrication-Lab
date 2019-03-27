package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.nilswesthoff.nils.digitalfabricationlab.News.News;
import com.nilswesthoff.nils.digitalfabricationlab.Profile.Request.Profile;
import com.nilswesthoff.nils.digitalfabricationlab.R;


public class Order extends AppCompatActivity implements View.OnClickListener {

    private static final int PICK_FILE_REQUEST = 234;
    private Button chooseButton, uploadButton;
    private BottomNavigationView mMainNav;

    private Uri filePath;

    private StorageReference storageReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        mMainNav=(BottomNavigationView) findViewById(R.id.main_nav);

        mMainNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                switch(menuItem.getItemId()) {
                    case R.id.nav_profile :
                        mMainNav.setItemBackgroundResource(R.color.Grey45);
                        Intent intent1=new Intent(Order.this, Profile.class);
                        startActivity(intent1);
                        break;

                    case R.id.nav_request :
                        mMainNav.setItemBackgroundResource(R.color.colorPrimary);
                        break;

                    case R.id.nav_news:
                        mMainNav.setItemBackgroundResource(R.color.Grey45);
                        Intent intent2=new Intent(Order.this, News.class);
                        startActivity(intent2);
                        break;

                    default:
                }
                return false;
            }
        });

        //payment method dropdown
        Spinner spinner_payment = (Spinner) findViewById(R.id.payment_method);
        ArrayAdapter<CharSequence> adapter_payment = ArrayAdapter.createFromResource(this,
                R.array.payment, android.R.layout.simple_spinner_item);
        adapter_payment.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_payment.setAdapter(adapter_payment);

        //choose machine dropdown
        Spinner spinner_machine = (Spinner) findViewById(R.id.choose_machine);
        ArrayAdapter<CharSequence> adapter_machine = ArrayAdapter.createFromResource(this,
                R.array.machine, android.R.layout.simple_spinner_item);
        adapter_machine.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner_machine.setAdapter(adapter_machine);

        storageReference = FirebaseStorage.getInstance().getReference();

        chooseButton = (Button) findViewById(R.id.choose_button);
        uploadButton = (Button) findViewById(R.id.upload_button);

        chooseButton.setOnClickListener(this);
        uploadButton.setOnClickListener(this);

    }

    private void showFileChooser(){
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(Intent.createChooser(intent,"Select file"),PICK_FILE_REQUEST);

    }

    private void uploadFile() {

        if (filePath != null) {

            final ProgressDialog progressDialog = new ProgressDialog(this);
            progressDialog.setTitle("Uploading...");
            progressDialog.show();


            StorageReference riversRef = storageReference.child("images/projects.jpg");

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
                            double progress = (100.0 * taskSnapshot.getBytesTransferred()/taskSnapshot.getTotalByteCount());
                            progressDialog.setMessage(((int) progress) + "% Uploaded...");
                        }
                    });
            ;
        }else{
            //display an error toast
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if(requestCode == PICK_FILE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null){
            filePath = data.getData();
        }
    }

    @Override
    public void onClick (View view) {
        if (view == chooseButton) {
            //open file chooser
            showFileChooser();
        } else if (view == uploadButton){
            //upload to firebase storage
            uploadFile();
        }

    }

}