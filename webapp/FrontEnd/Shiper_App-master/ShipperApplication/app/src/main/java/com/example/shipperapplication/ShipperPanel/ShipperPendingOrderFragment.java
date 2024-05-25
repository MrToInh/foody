package com.example.shipperapplication.ShipperPanel;

import android.Manifest;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.example.shipperapplication.Activity.SharedPreferencesManager;
import com.example.shipperapplication.Factory.ChatRoomFactory;
import com.example.shipperapplication.Factory.ChatRoomFactoryImpl;
import com.example.shipperapplication.R;
import com.example.shipperapplication.api.RetrofitInterface;
import com.example.shipperapplication.model.ChatRoom;
import com.example.shipperapplication.model.Item;
import com.example.shipperapplication.model.Message;
import com.example.shipperapplication.model.OrderDetails;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ShipperPendingOrderFragment extends Fragment {
    private RetrofitInterface retrofitInterface;
    private FusedLocationProviderClient fusedLocationClient;

    private static final int REQUEST_CODE_LOCATION_PERMISSION = 1;

    //private static final String BASE_URL = "http://10.0.2.2:3001/";
//    private static final String BASE_URL = "http://192.168.1.4:3001/";
    private static final String BASE_URL = "http://10.0.2.2:3001/";
    private TextView edit_username, edit_phone, edit_location_cus, edit_location_res, edit_note, edit_total;
    private Button btn_Accept, btn_Reject;
    private String authToken;

    private int orderid;
    private String locationShipper;

    private String delivery_id;
    private String user_id;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_shipper_pendingorders, container, false);

        edit_username = v.findViewById(R.id.userNameTxt);
        edit_phone = v.findViewById(R.id.phoneTxt);
        edit_location_cus = v.findViewById(R.id.locationTxtCus);
        edit_location_res = v.findViewById(R.id.locationTxtRes);
        edit_note = v.findViewById(R.id.NoteTxt);
        edit_total = v.findViewById(R.id.totalPriceTxt);

        btn_Accept = v.findViewById(R.id.acceptBtn);
        btn_Reject = v.findViewById(R.id.rejectBtn);

        authToken = SharedPreferencesManager.getInstance(requireContext()).getAuthToken();

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(requireActivity());

        // Initialize Retrofit
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        // Initialize RetrofitInterface
        retrofitInterface = retrofit.create(RetrofitInterface.class);

        // Fetch pending orders
        fetchPendingOrders();

        // Set click listeners for buttons
        btn_Accept.setOnClickListener(v1 -> handleAccept());
        btn_Reject.setOnClickListener(v2 -> handleReject());

        // Request location
        getLocation();

        return v;
    }

    private void fetchPendingOrders() {
        Call<List<OrderDetails>> call = retrofitInterface.getOrders("Bearer " + authToken);
        call.enqueue(new Callback<List<OrderDetails>>() {
            @Override
            public void onResponse(Call<List<OrderDetails>> call, Response<List<OrderDetails>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<OrderDetails> orderList = response.body();
                    if (!orderList.isEmpty()) {
                        OrderDetails orderDetails = orderList.get(0); // Get the first order from the list
                     orderid = orderDetails.getId();
//                        user_id=String.valueOf(orderDetails.getUser_id());
                        delivery_id=String.valueOf(orderDetails.getDelivery_id());
                        Item item = orderDetails.getItem();

                        // Display order details on the UI
                        edit_username.setText(orderDetails.getReceiver_name());
                        edit_location_cus.setText(orderDetails.getTo_address());
                        edit_location_res.setText(orderDetails.getFrom_address());
                        edit_total.setText(orderDetails.getPrice());
                    }
                } else {
                    // Handle the unsuccessful response
                    Toast.makeText(requireContext(), "Failed to fetch orders", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<OrderDetails>> call, Throwable t) {
                // Handle API call failure
                Toast.makeText(requireContext(), "API call failed: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void handleReject() {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("orderId", orderid);
        Call<OrderDetails> call = retrofitInterface.rejectOrder("Bearer " + authToken, map);

        call.enqueue(new Callback<OrderDetails>() {
            @Override
            public void onResponse(Call<OrderDetails> call, Response<OrderDetails> response) {
                showRejecttOrderInfo();
                navigateToHomeFragment();
            }

            @Override
            public void onFailure(Call<OrderDetails> call, Throwable t) {

            }
        });
        // Implement rejection handling
    }

    private void handleAccept() {
        HashMap<String, Integer> orderIdMap = new HashMap<>();
        orderIdMap.put("orderId", orderid);
        Call<OrderDetails> call = retrofitInterface.acceptOrder("Bearer " + authToken, orderIdMap);

        call.enqueue(new Callback<OrderDetails>() {
            @Override
            public void onResponse(Call<OrderDetails> call, Response<OrderDetails> response) {
                // Handle successful order acceptance
                showAccepttOrderInfo();
                String location_customer = edit_location_cus.getText().toString(); // Customer location
                String location_restaurant = edit_location_res.getText().toString(); // Restaurant location

                openGoogleMaps(locationShipper, location_customer, location_restaurant);
            }

            @Override
            public void onFailure(Call<OrderDetails> call, Throwable t) {
                // Handle failed order acceptance
                Toast.makeText(requireContext(), "Failed to accept order: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        createChatRoom(delivery_id,user_id);
    }
    private void showAccepttOrderInfo() {
        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        builder.setTitle("Order Confirmation")
                .setMessage("Order placed successfully! ")
                .setPositiveButton("Confirm", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // Xác nhận đã xem thông báo
                        dialog.dismiss();
                    }
                })
                .show();
    }
    private void showRejecttOrderInfo() {
        AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
        builder.setTitle("Order Reject Confirmation")
                .setMessage("REject Order successfully! ")
                .setPositiveButton("Confirm", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        // Xác nhận đã xem thông báo
                        dialog.dismiss();
                    }
                })
                .show();
    }


    private void openGoogleMaps(String source, String... waypoints) {
        try {
            // Encode the source and waypoints to handle spaces and special characters
            String encodedSource = URLEncoder.encode(source, "UTF-8");

            StringBuilder waypointsBuilder = new StringBuilder();
            for (int i = 0; i < waypoints.length - 1; i++) {
                if (waypointsBuilder.length() > 0) {
                    waypointsBuilder.append('|'); // Separate waypoints with a pipe character
                }
                waypointsBuilder.append(URLEncoder.encode(waypoints[i], "UTF-8"));
            }

            // Construct the URI for Google Maps directions with waypoints
            String uriString = "https://www.google.com/maps/dir/?api=1&origin=" + encodedSource +
                    "&destination=" + URLEncoder.encode(waypoints[waypoints.length - 1], "UTF-8") +
                    "&waypoints=" + waypointsBuilder.toString() +
                    "&travelmode=driving";

            Log.d("ShipperPendingOrderFragment", "Google Maps URI: " + uriString); // Debug log to check the URI

            Uri uri = Uri.parse(uriString);

            // Create an Intent to open Google Maps
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.setPackage("com.google.android.apps.maps");

            startActivity(intent);

        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            Log.e("ShipperPendingOrderFragment", "Error encoding URLs", e);
        }
    }

    private void getLocation() {
        if (ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    REQUEST_CODE_LOCATION_PERMISSION);
        } else {
            getCurrentLocation();
        }
    }

    private void getCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(requireContext(), Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(requireActivity(), location -> {
                    if (location != null) {
                        double latitude = location.getLatitude();
                        double longitude = location.getLongitude();
                        locationShipper = getAddressFromLocation(latitude, longitude);
                    } else {
                        Toast.makeText(requireContext(), "Failed to get current location", Toast.LENGTH_SHORT).show();
                    }
                })
                .addOnFailureListener(requireActivity(), e -> Toast.makeText(requireContext(),
                        "Unable to get current location: " + e.getMessage(), Toast.LENGTH_SHORT).show());
    }

    private String getAddressFromLocation(double latitude, double longitude) {
        Geocoder geocoder = new Geocoder(requireContext(), Locale.getDefault());
        try {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (addresses != null && !addresses.isEmpty()) {
                Address address = addresses.get(0);
                StringBuilder addressStringBuilder = new StringBuilder();
                for (int i = 0; i <= address.getMaxAddressLineIndex(); i++) {
                    addressStringBuilder.append(address.getAddressLine(i)).append("\n");
                }
                return addressStringBuilder.toString();
            } else {
                Toast.makeText(requireContext(), "No address found", Toast.LENGTH_SHORT).show();
                return "";
            }
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(requireContext(), "Unable to get address", Toast.LENGTH_SHORT).show();
            return "";
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_CODE_LOCATION_PERMISSION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getCurrentLocation();
            } else {
                Toast.makeText(requireContext(), "Permission denied", Toast.LENGTH_SHORT).show();
            }
        }
    }
    private void navigateToHomeFragment() {
        requireActivity().getSupportFragmentManager().beginTransaction()
                .replace(R.id.frame_container, new ShipperHomeFragment())
                .addToBackStack(null)
                .commit();
    }

    private void createChatRoom(String userId1, String userId2) {
        DatabaseReference chatRoomsRef = FirebaseDatabase.getInstance().getReference("chats");
        String chatRoomId = chatRoomsRef.push().getKey();

        Map<String, Boolean> participants = new HashMap<>();
        participants.put(userId1, true);
        participants.put(userId2, true);

        Map<String, Message> messages = new HashMap<>();

        ChatRoomFactory chatRoomFactory = new ChatRoomFactoryImpl();
        ChatRoom newChatRoom = chatRoomFactory.createChatRoom("New Chat Room", participants, messages);

        chatRoomsRef.child(chatRoomId).setValue(newChatRoom);
    }

}
