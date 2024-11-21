"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Paperclip } from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "John Doe",
    type: "admin",
    time: "10:30 AM",
    text: "Hey there!",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    sender: "Jane Smith",
    type: "student",
    time: "10:32 AM",
    text: "Hello! How are you?",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    sender: "Jane Smith",
    type: "student",
    time: "10:32 AM",
    text: "Hello! How are you?",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    sender: "Jane Smith",
    type: "student",
    time: "10:32 AM",
    text: "Hello! How are you?",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    sender: "Jane Smith",
    type: "student",
    time: "10:32 AM",
    text: "Hello! How are you?",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const DashboardChatBox = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: message,
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg", // Replace with the user"s profile picture
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <Card className="w-full">
      {/* Chat Box Header */}
      <CardHeader className="border-b">
        <CardTitle className="text-xl">Support Group</CardTitle>
      </CardHeader>

      {/* Chat Messages */}
      <ScrollArea className="h-80 p-4">
        <CardContent className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${
                msg.type === "admin" ? "justify-start" : "justify-end"
              }`}
            >
              {/* Show profile image on left for admin messages, on right for user messages */}
              {msg.type === "admin" ? (
                <img
                  src={msg.profilePic}
                  alt={`${msg.sender} profile`}
                  className="w-8 h-8 rounded-full"
                />
              ) : null}

              <div className={`${msg.type === "admin" ? "" : "text-right"}`}>
                <div className="flex items-center space-x-2">
                  {msg.type === "admin" ? (
                    <>
                      <span className="font-semibold">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      <span className="font-semibold">{msg.sender}</span>
                    </>
                  )}
                </div>
                <p className="text-sm">{msg.text}</p>
              </div>

              {/* Show profile image on right for user messages */}
              {msg.type !== "admin" ? (
                <img
                  src={msg.profilePic}
                  alt={`${msg.sender} profile`}
                  className="w-8 h-8 rounded-full"
                />
              ) : null}
            </div>
          ))}
        </CardContent>
      </ScrollArea>

      {/* Message Input and Send */}
      <CardFooter className="border-t flex items-center space-x-2 p-4">
        <Button
          variant="ghost"
          className="p-2"
          onClick={() => alert("Attachment clicked!")}
        >
          <Paperclip className="h-5 w-5 text-gray-500" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardChatBox;
