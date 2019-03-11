package com.nilswesthoff.nils.digitalfabricationlab;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;


public class Order extends AppCompatActivity implements View.OnClickListener {

    private static final int PICK_FILE_REQUEST = 234;
    private Button chooseButton, uploadButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        Spinner mySpinner = (Spinner) findViewById(R.id.payment_method);

        ArrayAdapter<String> myAdapter = new ArrayAdapter<String>(Order.this,
                android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.payment));
        myAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        mySpinner.setAdapter(myAdapter);

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

    @Override
    public void onClick (View view) {
        if (view == chooseButton) {
            //open file chooser
            showFileChooser();
        } else if (view == uploadButton){
            //upload to firebase storage
        }

    }
}
