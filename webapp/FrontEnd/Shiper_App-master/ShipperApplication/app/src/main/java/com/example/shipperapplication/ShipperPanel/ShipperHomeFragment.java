package com.example.shipperapplication.ShipperPanel;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.shipperapplication.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;

public class ShipperHomeFragment extends Fragment {

    private static final String TAG = "ShipperHomeFragment";

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_shipper_home, null);
        getActivity().setTitle("Home");

        // Lấy FCM token và xuất ra logcat
        getFCMToken();

        return v;
    }

    private void getFCMToken() {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (!task.isSuccessful()) {
                            Log.w(TAG, "Fetching FCM token failed", task.getException());
                            return;
                        }

                        // Get new FCM token
                        String token = task.getResult();

                        // Log và hiển thị token
                        Log.d(TAG, "FCM Token: " + token);
                    }
                });
    }
}
