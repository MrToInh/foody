package com.example.shipperapplication.ShipperPanel;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import com.example.shipperapplication.model.Driver;
import com.example.shipperapplication.model.DriverResponse;
import com.example.shipperapplication.R;
import com.example.shipperapplication.api.RetrofitInterface;
import com.example.shipperapplication.Activity.SharedPreferencesManager;
import com.google.android.material.textfield.TextInputEditText;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ShipperProfileFragment extends Fragment {
    private RetrofitInterface retrofitInterface;
    //private static final String BASE_URL = "http://10.0.2.2:3001/";
    private static final String BASE_URL = "http://192.168.1.4:3001/";
    //private static final String BASE_URL = "http://192.168.1.7:3001/";
    //private static final String BASE_URL = "http://192.168.1.7:3001/";
    private String authToken;

    private Button btnEdit;

    TextInputEditText txtDisplayName, txtUsername, txtEmail, txtPhone, txtLicenseNumber, txtVehicleType, txtCicardNumber;

    Retrofit retrofit = new Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build();
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_shipper_profile, container, false);

        // Initialize TextInputEditTexts
        txtDisplayName = v.findViewById(R.id.displayname_edit);
        txtUsername = v.findViewById(R.id.username_edit);
        txtEmail = v.findViewById(R.id.email_edit);
        txtPhone = v.findViewById(R.id.phone_edit);
        txtLicenseNumber = v.findViewById(R.id.driver_licenseNumber_edit);
        txtVehicleType = v.findViewById(R.id.vehicleType_edit);
        txtCicardNumber = v.findViewById(R.id.cicard_number_edit);

        btnEdit =v.findViewById(R.id.edit_info);
        // Get authToken from SharedPreferences
        authToken = SharedPreferencesManager.getInstance(requireContext()).getAuthToken();

        // Initialize Retrofit


        retrofitInterface = retrofit.create(RetrofitInterface.class);

        // Call API to get user data
        Call<DriverResponse> call = retrofitInterface.getDriverProfile("Bearer " + authToken);
        call.enqueue(new Callback<DriverResponse>() {
            @Override
            public void onResponse(Call<DriverResponse> call, Response<DriverResponse> response) {
                if (response.isSuccessful()) {
                    DriverResponse driverResponse = response.body();
                    if (driverResponse != null) {
                        Driver driver = driverResponse.getDriver();
                        if (driver != null) {
                            Log.d("ShipperProfileFragment", "Driver Name: " + driver.getName());
                            // Display data in TextInputEditTexts
                            txtDisplayName.setText(driver.getName());
                            txtUsername.setText(driver.getUsername());
                            txtEmail.setText(driver.getEmail());
                            txtPhone.setText(driver.getPhone());
                            txtLicenseNumber.setText(driver.getDriver_licenseNumber());
                            txtVehicleType.setText(driver.getVehicleType());
                            txtCicardNumber.setText(driver.getCicardNumber());
                        } else {
                            Log.w("ShipperProfileFragment", "Driver data is null");
                        }
                    } else {
                        Log.w("ShipperProfileFragment", "DriverResponse is null");
                    }
                } else {
                    Log.e("ShipperProfileFragment", "Response error: " + response.message());
                }
            }

            @Override
            public void onFailure(Call<DriverResponse> call, Throwable t) {
                Log.e("ShipperProfileFragment", "API call failed: ", t);
            }
        });


        btnEdit.setOnClickListener(v1 -> {
            handleEditProfile();
        });
        return v;
    }

    private void handleEditProfile() {
        String displayName = txtDisplayName.getText().toString().trim();
        String username = txtUsername.getText().toString().trim();
        String email = txtEmail.getText().toString().trim();
        String phone = txtPhone.getText().toString().trim();
        String licenseNumber = txtLicenseNumber.getText().toString().trim();
        String vehicleType = txtVehicleType.getText().toString().trim();
        String cicardNumber = txtCicardNumber.getText().toString().trim();

//        if (displayName.isEmpty() || username.isEmpty() || email.isEmpty() || phone.isEmpty() ||
//                licenseNumber.isEmpty() || vehicleType.isEmpty() || cicardNumber.isEmpty()) {
//            Toast.makeText(getContext(), "Please fill in all fields", Toast.LENGTH_LONG).show();
//            return;
//        }

        authToken = SharedPreferencesManager.getInstance(requireContext()).getAuthToken();

        // Initialize Retrofit


        retrofitInterface = retrofit.create(RetrofitInterface.class);
        HashMap<String, String> map = new HashMap<>();
        map.put("name", displayName);
        map.put("username", username);
        map.put("email", email);
        map.put("phone", phone);
        map.put("licenseNumber", licenseNumber);
        map.put("vehicleType", vehicleType);
        map.put("cicard_number", cicardNumber);


        Call<Driver> call2 = retrofitInterface.updateDriverProfile("Bearer " + authToken, map);

        call2.enqueue(new Callback<Driver>() {
            @Override
            public void onResponse(Call<Driver> call2, Response<Driver> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Driver result = response.body();

                    // Save authToken into SharedPreferences
                    Toast.makeText(getContext(), "Profile updated", Toast.LENGTH_LONG).show();
                    // Navigate to ShipperPanelBottomNavigationActivity

                } else if (response.code() == 401) {
                    Toast.makeText(getContext(), "Wrong Credentials", Toast.LENGTH_LONG).show();
                } else {
                    Toast.makeText(getContext(), "Profile update failed, please try again.", Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<Driver> call, Throwable t) {
                Toast.makeText(getContext(), "Request failed: " + t.getMessage(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
