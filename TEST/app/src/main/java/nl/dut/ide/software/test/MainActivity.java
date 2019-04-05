package nl.dut.ide.software.test;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity {

    private EditText project_titel, description_test;
    private Button confirm;

    DatabaseReference databaseReference;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        databaseReference = FirebaseDatabase.getInstance().getReference("projectsTEST");

        project_titel = (EditText) findViewById(R.id.project_titel);
        description_test = (EditText) findViewById(R.id.description_test);

        confirm = (Button) findViewById(R.id.confirm);

        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                confirmProject();
            }
        });
    }

    public void confirmProject(){
        String projectTitel = project_titel.getText().toString();
        String projectDescription = description_test.getText().toString();

        if (!TextUtils.isEmpty(projectTitel) && !TextUtils.isEmpty(projectDescription)){

            String id = databaseReference.push().getKey();

            Project project = new Project(id, projectTitel, projectDescription);

            databaseReference.child(id).setValue(project);
            project_titel.setText("");
            description_test.setText("");

        }
        else{
            Toast.makeText(MainActivity.this, "Please enter Title and/or description",Toast.LENGTH_SHORT).show();
        }
    }
}

