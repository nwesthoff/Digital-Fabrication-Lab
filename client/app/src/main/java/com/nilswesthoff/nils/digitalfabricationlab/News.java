package com.nilswesthoff.nils.digitalfabricationlab;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;

public class News extends AppCompatActivity {
    private BottomNavigationView mMainNav;
    private Order order;
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
                        mMainNav.setItemBackgroundResource(R.color.Grey45);
                        Intent intent0 = new Intent(News.this, Profile.class);
                        startActivity(intent0);
                        break;

                    case R.id.nav_request:
                        mMainNav.setItemBackgroundResource(R.color.Grey45);
                        Intent intent1 = new Intent(News.this, Order.class);
                        startActivity(intent1);
                        break;

                    case R.id.nav_news:
                        mMainNav.setItemBackgroundResource(R.color.colorPrimary);
                        break;

                    default:
                }
                return false;
            }
        });
    }
}
