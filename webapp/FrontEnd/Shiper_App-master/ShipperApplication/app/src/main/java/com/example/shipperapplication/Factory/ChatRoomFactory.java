package com.example.shipperapplication.Factory;


import com.example.shipperapplication.model.ChatRoom;
import com.example.shipperapplication.model.Message;

import java.util.Map;

public interface ChatRoomFactory {
        ChatRoom createChatRoom(String name, Map<String, Boolean> participants, Map<String, Message> messages);
}
