package com.example.shipperapplication.model;

import java.util.Map;

public class ChatRoom {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String name;
    private Map<String, Boolean> participants;
    private Map<String, Message> messages;

    // Default constructor required for calls to DataSnapshot.getValue(ChatRoom.class)
    public ChatRoom() {
    }

    public ChatRoom(String name, Map<String, Boolean> participants, Map<String, Message> messages) {
        this.name = name;
        this.participants = participants;
        this.messages = messages;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Boolean> getParticipants() {
        return participants;
    }

    public void setParticipants(Map<String, Boolean> participants) {
        this.participants = participants;
    }

    public Map<String, Message> getMessages() {
        return messages;
    }

    public void setMessages(Map<String, Message> messages) {
        this.messages = messages;
    }
}
