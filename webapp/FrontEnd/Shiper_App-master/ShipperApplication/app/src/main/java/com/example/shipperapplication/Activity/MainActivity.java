package com.example.shipperapplication.Activity;
import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.shipperapplication.R;
import com.example.shipperapplication.api.RetrofitInterface;
import com.example.shipperapplication.model.Driver;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.HashMap;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {
    private RetrofitInterface retrofitInterface;
    private static final String BASE_URL = "http://10.0.2.2:3001/";
//    private static final String BASE_URL = "http://192.168.1.4:3001/";
    private MaterialButton btnLogin, btnLinkToRegister, btnForgotPass;
    private TextInputEditText inputUsername, inputPassword;

    private String fcmToken;
    HashMap<String, String> map = new HashMap<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        inputUsername = findViewById(R.id.username);
        inputPassword = findViewById(R.id.password);
        btnLogin = findViewById(R.id.button_login);
        btnLinkToRegister = findViewById(R.id.button_register);
        btnForgotPass = findViewById(R.id.button_reset);

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        retrofitInterface = retrofit.create(RetrofitInterface.class);

        getFCMToken();

        btnLogin.setOnClickListener(v -> handleLogin());

        btnLinkToRegister.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, Register.class);
            startActivity(intent);
        });

        btnForgotPass.setOnClickListener(v -> {
            handleForgotPassword();
        });
    }

    private void handleLogin() {
        String username = inputUsername.getText().toString().trim();
        String password = inputPassword.getText().toString().trim();

        if (username.isEmpty() || password.isEmpty()) {
            Toast.makeText(MainActivity.this, "Please fill in both fields", Toast.LENGTH_LONG).show();
            return;
        }

        map.put("username", username);
        map.put("password", password);

        Call<Driver> call = retrofitInterface.executeLogin(map);

        call.enqueue(new Callback<Driver>() {
            @Override
            public void onResponse(Call<Driver> call, Response<Driver> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Driver result = response.body();
                    String authToken = result.getToken();
                    Log.d("AuthToken", authToken);


                    // Lưu authToken vào SharedPreferences
                    SharedPreferencesManager.getInstance(MainActivity.this).saveAuthToken(authToken);

                    // Chuyển sang màn hình ShipperPanelActivity
                    Intent intent = new Intent(MainActivity.this, ShipperPanelBottomNavigationActivity.class);
                    intent.putExtra("delivery_id",String.valueOf(result.getId()));
                    startActivity(intent);
                    finish();
                } else if (response.code() == 401) {
                    Toast.makeText(MainActivity.this, "Wrong Credentials", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(MainActivity.this, "Login failed, please try again.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Driver> call, Throwable t) {
                Toast.makeText(MainActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }

    private void handleForgotPassword() {
        // Implement your forgot password functionality here
        Toast.makeText(MainActivity.this, "Forgot password feature coming soon!", Toast.LENGTH_LONG).show();
    }

    private void getFCMToken() {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (task.isSuccessful()) {
                            // Get new FCM token
                            fcmToken = task.getResult();

                            // Log và hiển thị token
                            Log.d(TAG, "FCM Token: " + fcmToken);

                            // Thêm fcm_token vào map
                            map.put("fcm_token", fcmToken);

                            // Check if activity is not destroyed
                            if (!isFinishing() && !isDestroyed()) {
                                // Update UI or perform any other actions if necessary
                            }
                        } else {
                            // Handle errors
                            Exception exception = task.getException();
                            if (exception != null) {
                                Log.w(TAG, "Fetching FCM token failed", exception);
                            } else {
                                Log.w(TAG, "Fetching FCM token failed with no exception");
                            }
                        }
                    }
                });
    }
}
