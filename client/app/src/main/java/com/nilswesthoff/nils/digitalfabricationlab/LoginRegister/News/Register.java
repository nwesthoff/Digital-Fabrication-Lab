package com.nilswesthoff.nils.digitalfabricationlab.LoginRegister.News;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.nilswesthoff.nils.digitalfabricationlab.LoginActivity;
import com.nilswesthoff.nils.digitalfabricationlab.R;
import com.nilswesthoff.nils.digitalfabricationlab.MainActivity;

import java.util.HashMap;

public class Register extends AppCompatActivity implements View.OnClickListener {

    EditText name, Studenttype, email, password, bio;
    Button register;
    ImageView Profileimage;
    TextView txt_login;

    FirebaseAuth auth;
    DatabaseReference reference;
    ProgressDialog pd;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        name = findViewById(R.id.name);
        Studenttype = findViewById(R.id.Studenttype);
        email = findViewById(R.id.email_login_form);
        password = findViewById(R.id.password);
        bio = findViewById(R.id.Bio);

        Profileimage = (ImageView) findViewById(R.id.Profile_image);
        Profileimage.setOnClickListener(this);

        auth = FirebaseAuth.getInstance();

        txt_login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(Register.this, LoginActivity.class));
            }
        });

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                pd = new ProgressDialog(Register.this);
                pd.setMessage("Please wait...");
                pd.show();

                String str_name = name.getText().toString();
                String str_studenttype = Studenttype.getText().toString();
                String str_email = email.getText().toString();
                String str_password = password.getText().toString();

                if (TextUtils.isEmpty(str_name) || TextUtils.isEmpty(str_studenttype)
                        || TextUtils.isEmpty(str_email) || TextUtils.isEmpty(str_password)) {
                    Toast.makeText(Register.this, "All fields are required!", Toast.LENGTH_SHORT).show();
                } else if (str_password.length() < 6) {
                    Toast.makeText(Register.this, "Password must have 6 characters", Toast.LENGTH_SHORT).show();
                } else {

                }
            }
        });
    }

    private void register(final String name, final String Studenttype, String email, String password, String bio) {
        auth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(Register.this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            FirebaseUser currentUser = auth.getCurrentUser();
                            String userid = currentUser.getUid();

                            reference = FirebaseDatabase.getInstance().getReference().child("Users").child(userid);

                            HashMap<String, Object> hashMap = new HashMap<>();
                            hashMap.put("id", userid);
                            hashMap.put("name", name.toLowerCase());
                            hashMap.put("Studenttype", Studenttype);
                            hashMap.put("bio", "");
                            hashMap.put("Profile_image", "");

                            reference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if (task.isSuccessful()) {
                                        if (task.isSuccessful()) {
                                            pd.dismiss();
                                            Intent intent = new Intent(Register.this, MainActivity.class);
                                            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                                            startActivity(intent);
                                        }
                                    }

                                }
                            });
                        } else {
                            pd.dismiss();
                            Toast.makeText(Register.this, "You can't register with this email or password", Toast.LENGTH_SHORT).show();
                        }
                    }
                });

    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {

        }

    }
}
