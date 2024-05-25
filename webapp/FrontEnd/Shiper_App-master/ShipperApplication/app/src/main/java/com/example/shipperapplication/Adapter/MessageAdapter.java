package com.example.shipperapplication.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.shipperapplication.R;
import com.example.shipperapplication.model.Message;

import java.util.ArrayList;

public class MessageAdapter extends RecyclerView.Adapter<MessageAdapter.ViewHolder> {

    private ArrayList<Message> messages;
    private Context context;

    public MessageAdapter(Context context, ArrayList<Message> messages) {
        this.context = context;
        this.messages = messages;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_message, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Message message = messages.get(position);
        holder.content.setText(message.getContent());
        holder.senderId.setText(message.getSenderId());
        if (message.getSenderId().equals("user1")) {
            holder.itemView.setBackgroundResource(R.drawable.background_message_sent);
        } else {
            holder.itemView.setBackgroundResource(R.drawable.background_message_received); // Set background color or drawable for received messages
        }
    }


    @Override
    public int getItemCount() {
        return messages.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView content, senderId, timestamp;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            content = itemView.findViewById(R.id.messageContent);
            senderId = itemView.findViewById(R.id.messageSenderId);
            //timestamp = itemView.findViewById(R.id.messageTimestamp);
        }
    }
}
