package com.example.shipperapplication.Activity;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.shipperapplication.Adapter.MessageAdapter;
import com.example.shipperapplication.R;
import com.example.shipperapplication.model.Message;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class ChatRoomActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private MessageAdapter adapter;
    private ArrayList<Message> messageList;
    private DatabaseReference messagesRef;
    private String chatRoomId;
    private String delivery_id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat_room);
        delivery_id=getIntent().getStringExtra("delivery_id");
        chatRoomId = getIntent().getStringExtra("chatRoomId");
        if (chatRoomId == null) {
            throw new IllegalArgumentException("chatRoomId must not be null");
        }

        recyclerView = findViewById(R.id.chatroom);
        messageList = new ArrayList<>();
        adapter = new MessageAdapter(this, messageList);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        messagesRef = FirebaseDatabase.getInstance().getReference("chats").child(chatRoomId).child("messages");
        messagesRef.orderByChild("timestamp").addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                messageList.clear();
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    Message message = snapshot.getValue(Message.class);
                    if (message != null) {
                        messageList.add(message);
                    }
                }
                adapter.notifyDataSetChanged();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                // Handle possible errors.
            }
        });

        Button buttonSend = findViewById(R.id.buttonSend);
        EditText editTextMessage = findViewById(R.id.editTextMessage);

        buttonSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                sendMessage(editTextMessage.getText().toString());
                editTextMessage.setText(""); // Clear message content after sending
            }
        });
    }

    private void sendMessage(String messageContent) {
        if (TextUtils.isEmpty(messageContent)) {
            return;
        }

        DatabaseReference messagesRef = FirebaseDatabase.getInstance().getReference("chats").child(chatRoomId).child("messages");
        String messageId = messagesRef.push().getKey();
        if (messageId == null) {
            // Handle the case where the unique key couldn't be generated
            return;
        }

        long timestamp = System.currentTimeMillis();

        Message message = new Message();
        message.setContent(messageContent);
        message.setSenderId(delivery_id);
        message.setTimestamp(timestamp);

        // Set the message with the generated message ID
        messagesRef.child(messageId).setValue(message);
    }
}
