package com.example.shipperapplication.Activity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.shipperapplication.R;
import com.example.shipperapplication.api.RetrofitInterface;
import com.example.shipperapplication.model.Driver;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputLayout;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class Register extends AppCompatActivity {
    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private static final String BASE_URL = "http://192.168.1.4:3001/";
    private MaterialButton btnRegister, btnGoToLogin;
    private TextInputLayout inputName, inputEmail, inputPassword;


    private  HashMap<String, String> map = new HashMap<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        inputName = findViewById(R.id.edit_name);
        inputEmail = findViewById(R.id.edit_email);
        inputPassword = findViewById(R.id.edit_password);
        btnRegister = findViewById(R.id.button_register);
        btnGoToLogin = findViewById(R.id.button_login);

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);

        btnRegister.setOnClickListener(v -> handleRegister());

        btnGoToLogin.setOnClickListener(v -> {
            Intent intent = new Intent(Register.this, MainActivity.class);
            startActivity(intent);
        });


    }

    private void handleRegister() {
        String username = inputName.getEditText().getText().toString().trim();
        String email = inputEmail.getEditText().getText().toString().trim();
        String password = inputPassword.getEditText().getText().toString().trim();

        if (username.isEmpty() || password.isEmpty() || email.isEmpty()) {
            Toast.makeText(Register.this, "Please fill in all fields", Toast.LENGTH_LONG).show();
            return;
        }

        //HashMap<String, String> map = new HashMap<>();
        map.put("username", username);
        map.put("password", password);
        map.put("email", email);

        Call<Driver> call = retrofitInterface.executeRegister(map);

        call.enqueue(new Callback<Driver>() {
            @Override
            public void onResponse(Call<Driver> call, Response<Driver> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Driver result = response.body();

                    //Start VerifyOtpActivity and pass email as an extra
                    Intent intent = new Intent(Register.this, VerifyOtpActivity.class);
                    intent.putExtra("email", email); // Pass email as an extra
                    startActivity(intent);
                } else {
                    Toast.makeText(Register.this, "Register failed, please try again.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Driver> call, Throwable t) {
                Toast.makeText(Register.this, "Network error: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
