
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[]; // User IDs
  participantNames: Record<string, string>; // Map of user IDs to names
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

interface MessageContextType {
  conversations: Conversation[];
  loadingConversations: boolean;
  currentConversation: Conversation | null;
  messages: Message[];
  loadingMessages: boolean;
  getConversations: () => Promise<void>;
  getMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  createConversation: (receiverId: string, receiverName: string) => Promise<string>;
  markConversationAsRead: (conversationId: string) => Promise<void>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

// Mock data - would be replaced with API calls in a real app
const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "conv1",
    senderId: "2",
    senderName: "Provider User",
    receiverId: "1",
    content: "Bonjour, je suis intéressé par votre projet.",
    timestamp: new Date(2023, 5, 15, 10, 30),
    read: true
  },
  {
    id: "2",
    conversationId: "conv1",
    senderId: "1",
    senderName: "Client User",
    receiverId: "2",
    content: "Merci pour votre message. Pourriez-vous me donner plus de détails sur vos services?",
    timestamp: new Date(2023, 5, 15, 11, 45),
    read: true
  },
  {
    id: "3",
    conversationId: "conv1",
    senderId: "2",
    senderName: "Provider User",
    receiverId: "1",
    content: "Bien sûr! Je propose des services de conseil en stratégie avec une spécialisation dans le développement international.",
    timestamp: new Date(2023, 5, 15, 14, 20),
    read: false
  }
];

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: ["1", "2"],
    participantNames: {
      "1": "Client User",
      "2": "Provider User"
    },
    lastMessage: mockMessages[2],
    unreadCount: 1,
    updatedAt: new Date(2023, 5, 15, 14, 20)
  }
];

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Get conversations for the current user
  const getConversations = async () => {
    if (!user) return;
    
    setLoadingConversations(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter conversations that involve the current user
      const userConversations = mockConversations.filter(
        conv => conv.participants.includes(user.id)
      );
      
      setConversations(userConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Get messages for a specific conversation
  const getMessages = async (conversationId: string) => {
    if (!user) return;
    
    setLoadingMessages(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find the conversation
      const conversation = mockConversations.find(conv => conv.id === conversationId);
      if (conversation) {
        setCurrentConversation(conversation);
        
        // Filter messages for this conversation
        const conversationMessages = mockMessages
          .filter(msg => msg.conversationId === conversationId)
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        
        setMessages(conversationMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Send a new message
  const sendMessage = async (conversationId: string, content: string) => {
    if (!user || !content.trim()) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create new message
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        conversationId,
        senderId: user.id,
        senderName: user.name,
        receiverId: currentConversation?.participants.find(id => id !== user.id) || "",
        content,
        timestamp: new Date(),
        read: false
      };
      
      // Update messages
      setMessages(prev => [...prev, newMessage]);
      
      // Update last message in conversation
      const updatedConversations = conversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: newMessage,
            updatedAt: new Date()
          };
        }
        return conv;
      });
      
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Create a new conversation
  const createConversation = async (receiverId: string, receiverName: string) => {
    if (!user) throw new Error("User must be logged in");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if conversation already exists
      const existingConversation = conversations.find(
        conv => conv.participants.includes(user.id) && conv.participants.includes(receiverId)
      );
      
      if (existingConversation) {
        setCurrentConversation(existingConversation);
        return existingConversation.id;
      }
      
      // Create new conversation
      const newConversation: Conversation = {
        id: Math.random().toString(36).substr(2, 9),
        participants: [user.id, receiverId],
        participantNames: {
          [user.id]: user.name,
          [receiverId]: receiverName
        },
        unreadCount: 0,
        updatedAt: new Date()
      };
      
      setConversations(prev => [...prev, newConversation]);
      setCurrentConversation(newConversation);
      setMessages([]);
      
      return newConversation.id;
    } catch (error) {
      console.error("Error creating conversation:", error);
      throw error;
    }
  };

  // Mark a conversation as read
  const markConversationAsRead = async (conversationId: string) => {
    if (!user) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update messages read status
      const updatedMessages = messages.map(msg => {
        if (msg.conversationId === conversationId && msg.receiverId === user.id && !msg.read) {
          return { ...msg, read: true };
        }
        return msg;
      });
      
      setMessages(updatedMessages);
      
      // Update conversation unread count
      const updatedConversations = conversations.map(conv => {
        if (conv.id === conversationId) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      });
      
      setConversations(updatedConversations);
    } catch (error) {
      console.error("Error marking conversation as read:", error);
    }
  };

  // Load conversations when user changes
  useEffect(() => {
    if (user) {
      getConversations();
    } else {
      setConversations([]);
      setCurrentConversation(null);
      setMessages([]);
    }
  }, [user]);

  return (
    <MessageContext.Provider
      value={{
        conversations,
        loadingConversations,
        currentConversation,
        messages,
        loadingMessages,
        getConversations,
        getMessages,
        sendMessage,
        createConversation,
        markConversationAsRead
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
