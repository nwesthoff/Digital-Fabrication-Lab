package com.nilswesthoff.nils.digitalfabricationlab.News;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;

import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;
import com.nilswesthoff.nils.digitalfabricationlab.Users.ProfileActivity;
import com.nilswesthoff.nils.digitalfabricationlab.Orders.CreateOrderActivity;
import com.nilswesthoff.nils.digitalfabricationlab.R;

public class News extends AppCompatActivity {
    private BottomNavigationView mMainNav;
    private MainActivity mainActivity;
    private News  news;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news);

        mMainNav=(BottomNavigationView) findViewById(R.id.main_nav);

        mMainNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {

                switch (menuItem.getItemId()) {
                    case R.id.nav_profile:
                        Intent intent0 = new Intent(News.this, ProfileActivity.class);
                        startActivity(intent0);
                        break;

                    case R.id.nav_request:
                        Intent intent1 = new Intent(News.this, MainActivity.class);
                        startActivity(intent1);
                        break;

                    case R.id.nav_news:

                        break;

                    default:
                }
                return false;
            }
        });
    }
}
