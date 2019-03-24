package com.nilswesthoff.nils.digitalfabricationlab;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class Register extends AppCompatActivity implements View.OnClickListener  {

    ImageView Profileimage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Profileimage=(ImageView) findViewById(R.id.Profile_image);

        Profileimage.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        switch (v.getId()){

        }

    }
}
