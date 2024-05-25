package com.example.shipperapplication.Activity;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

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

public class VerifyOtpActivity extends AppCompatActivity {

    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    //private static final String BASE_URL = "http://10.0.2.2:3001/";
    private static final String BASE_URL = "http://192.168.1.4:3001/";
    private MaterialButton btnVerify;
    private TextInputLayout txtVerify;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.verify_otp);
        btnVerify = findViewById(R.id.button_verify_otp);
        txtVerify = findViewById(R.id.edit_otp);

        // Get the email from the intent extras
        String email = getIntent().getStringExtra("email");
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);
        btnVerify.setOnClickListener(v -> handleVerify(email)); // Pass email to handleVerify()
    }

    private void handleVerify(String email) {
        String otpString = txtVerify.getEditText().getText().toString().trim();

        if (otpString.isEmpty()) {
            Toast.makeText(VerifyOtpActivity.this, "Please enter OTP", Toast.LENGTH_LONG).show();
            return;
        }

        HashMap<String, String> map = new HashMap<>();
        map.put("email", email); // Use the email passed from the registration activity
        map.put("otp", otpString);

        Call<Driver> call = retrofitInterface.verifyOtp(map);

        call.enqueue(new Callback<Driver>() {
            @Override
            public void onResponse(Call<Driver> call, Response<Driver> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Driver result = response.body();
                    AlertDialog.Builder builder = new AlertDialog.Builder(VerifyOtpActivity.this);
                    builder.setTitle("Welcome " + result.getUsername())
                            .setMessage("Email: " + result.getEmail())
                            .setPositiveButton("OK", (dialog, which) -> {
                                Intent intent = new Intent(VerifyOtpActivity.this, MainActivity.class);
                                startActivity(intent);
                                finish();
                            })
                            .show();
                } else if (response.code() == 401) {
                    Toast.makeText(VerifyOtpActivity.this, "Wrong Credentials", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(VerifyOtpActivity.this, "OTP invalid, please try again.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Driver> call, Throwable t) {
                Toast.makeText(VerifyOtpActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}

