package com.nilswesthoff.nils.digitalfabricationlab.Profile.Users;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;
import com.nilswesthoff.nils.digitalfabricationlab.News.News;
import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.Request.CreateOrderActivity;

public class ProfileActivity extends Fragment {

    private BottomNavigationView mMainNav;
    private CreateOrderActivity createOrderActivity;
    private News news;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.activity_profile, container, false);


        mMainNav = view.findViewById(R.id.main_nav);

        mMainNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                switch (menuItem.getItemId()) {
                    case R.id.nav_profile:

                        break;

                    case R.id.nav_request:
                        Intent intent1 = new Intent(getActivity(), MainActivity.class);
                        startActivity(intent1);
                        break;

                    case R.id.nav_news:
                        Intent intent2 = new Intent(getActivity(), News.class);
                        startActivity(intent2);
                        break;

                    default:
                }
                return false;
            }
        });

        return view;
    }
}
