package com.nilswesthoff.nils.digitalfabricationlab.Profile.Request;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;

import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;
import com.nilswesthoff.nils.digitalfabricationlab.News.News;
import com.nilswesthoff.nils.digitalfabricationlab.Request.Order;
import com.nilswesthoff.nils.digitalfabricationlab.R;

public class Profile extends AppCompatActivity {

    private BottomNavigationView mMainNav;
    private Order order;
    private News news;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        mMainNav=(BottomNavigationView) findViewById(R.id.main_nav);

        mMainNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                switch(menuItem.getItemId()) {
                    case R.id.nav_profile :

                        break;

                    case R.id.nav_request :
                        Intent intent1=new Intent(Profile.this, MainActivity.class);
                        startActivity(intent1);
                        break;

                    case R.id.nav_news:
                        Intent intent2=new Intent(Profile.this, News.class);
                        startActivity(intent2);
                        break;

                    default:
                }
                        return false;
            }
        });
    }
}
