package com.example.shipperapplication.Factory;

import com.example.shipperapplication.model.ChatRoom;
import com.example.shipperapplication.model.Message;

import java.util.Map;

public class ChatRoomFactoryImpl implements ChatRoomFactory {
    @Override
    public ChatRoom createChatRoom(String name, Map<String, Boolean> participants, Map<String, Message> messages) {
        return new ChatRoom(name, participants, messages);
    }
}
