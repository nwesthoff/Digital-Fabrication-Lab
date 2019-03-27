package com.nilswesthoff.nils.digitalfabricationlab.Request;

import android.app.VoiceInteractor;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.nilswesthoff.nils.digitalfabricationlab.R;

public class Tab1Fragment extends Fragment {
    private static final String TAG = "Tab1Fragment";
    private Button button1;

   @Nullable
   @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
       View view = inflater.inflate(R.layout.fragment_requests,container,false);

       //Button button1 = (Button) getView()av.findViewById(R.id.make_request);
       //button1.setOnClickListener(new View.OnClickListener() {
       //    public void onClick(View v) {
               // Do something in response to button click
       //        Intent MyIntent = new Intent (getActivity(), Order.class);
       //        startActivity(MyIntent);
       //    }
       //});

       return view;

   }


}
