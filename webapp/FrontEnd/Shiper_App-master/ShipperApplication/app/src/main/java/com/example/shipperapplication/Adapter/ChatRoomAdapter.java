package com.example.shipperapplication.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.shipperapplication.R;
import com.example.shipperapplication.model.ChatRoom;

import java.util.ArrayList;

public class ChatRoomAdapter extends RecyclerView.Adapter<ChatRoomAdapter.ViewHolder> {

    public interface OnItemClickListener {
        void onItemClick(ChatRoom chatRoom);
    }

    private Context context;
    private ArrayList<ChatRoom> chatRooms;
    private OnItemClickListener listener;

    public ChatRoomAdapter(Context context, ArrayList<ChatRoom> chatRooms, OnItemClickListener listener) {
        this.context = context;
        this.chatRooms = chatRooms;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_chat_room, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        ChatRoom chatRoom = chatRooms.get(position);
        holder.name.setText(chatRoom.getName());
        holder.itemView.setOnClickListener(v -> listener.onItemClick(chatRoom));
    }

    @Override
    public int getItemCount() {
        return chatRooms.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView name;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            name = itemView.findViewById(R.id.roomName);
        }
    }
}
