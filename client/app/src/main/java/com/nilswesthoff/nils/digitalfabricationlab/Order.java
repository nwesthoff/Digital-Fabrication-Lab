package com.nilswesthoff.nils.digitalfabricationlab;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class Order extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_order2);

        Spinner mySpinner = (Spinner) findViewById(R.id.payment_method);

        ArrayAdapter<String> myAdapter = new ArrayAdapter<String>(Order.this,
                android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.payment));
        myAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        mySpinner.setAdapter(myAdapter);
    }
}
