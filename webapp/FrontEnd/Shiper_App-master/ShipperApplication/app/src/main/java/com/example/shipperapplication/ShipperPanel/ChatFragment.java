package com.example.shipperapplication.ShipperPanel;

import android.content.Intent;
import android.os.Bundle;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.shipperapplication.Activity.ChatRoomActivity;
import com.example.shipperapplication.Adapter.ChatRoomAdapter;
import com.example.shipperapplication.Factory.ChatRoomFactory;
import com.example.shipperapplication.Factory.ChatRoomFactoryImpl;
import com.example.shipperapplication.R;
import com.example.shipperapplication.model.ChatRoom;
import com.example.shipperapplication.model.Message;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.PrimitiveIterator;

public class ChatFragment extends Fragment {

    private RecyclerView recyclerView;
    private ChatRoomAdapter adapter;
    private ArrayList<ChatRoom> chatRoomList;
    private DatabaseReference chatRoomsRef;
    private String delivery_id;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_chat, container, false);
        recyclerView = view.findViewById(R.id.list_room);
        if (getArguments() != null) {
            delivery_id = getArguments().getString("delivery_id");
        }

        chatRoomList = new ArrayList<>();
        adapter = new ChatRoomAdapter(getContext(), chatRoomList, new ChatRoomAdapter.OnItemClickListener() {
            @Override
            public void onItemClick(ChatRoom chatRoom) {
                Intent intent = new Intent(getActivity(), ChatRoomActivity.class);
                intent.putExtra("delivery_id",delivery_id);
                intent.putExtra("chatRoomId", chatRoom.getId());
                startActivity(intent);
            }
        });
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        chatRoomsRef = FirebaseDatabase.getInstance().getReference("chats");
        chatRoomsRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                chatRoomList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    ChatRoom chatRoom = snapshot.getValue(ChatRoom.class);
                    if (chatRoom != null && chatRoom.getParticipants().containsKey(delivery_id)) {
                        chatRoom.setId(snapshot.getKey()); // Set the ID of the chat room
                        chatRoomList.add(chatRoom);
                    }
                }
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                // Handle possible errors.
            }
        });

        return view;
    }
}
