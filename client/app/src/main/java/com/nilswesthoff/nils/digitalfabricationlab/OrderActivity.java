package com.nilswesthoff.nils.digitalfabricationlab;

import android.os.Bundle;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class OrderActivity {

    @Override
    protected void OnCreate(Bundle savedInstanceState) {
        super.OnCreate(savedInstanceState);
        setContentView(R.layout.activity_order);

        Spinner mySpinner = (Spinner) findViewById(R.id.payment_method);

        ArrayAdapter<String> myAdapter = new ArrayAdapter<String>(OrderActivity.this
                android.R.layout.simple_list_item_1, getResources(.).getStringArray(R.array.Paymentmethod))
        myAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown);
        mySpinner.setAdapter(myAdapter);

    }

}
