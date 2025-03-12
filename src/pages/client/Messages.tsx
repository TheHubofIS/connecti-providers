
import { useEffect, useState, useRef } from "react";
import { useMessages } from "@/contexts/MessageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Send, Loader2 } from "lucide-react";

export default function ClientMessages() {
  const { user } = useAuth();
  const { 
    conversations, 
    loadingConversations, 
    currentConversation,
    messages, 
    loadingMessages,
    getConversations,
    getMessages,
    sendMessage,
    markConversationAsRead
  } = useMessages();
  
  const [newMessage, setNewMessage] = useState("");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (selectedConversationId) {
      getMessages(selectedConversationId);
      markConversationAsRead(selectedConversationId);
    }
  }, [selectedConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedConversationId && newMessage.trim()) {
      sendMessage(selectedConversationId, newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-24 px-4">
        <h1 className="text-3xl font-bold mb-8">Messagerie</h1>
        
        <div className="grid md:grid-cols-3 gap-6 h-[70vh]">
          {/* Sidebar with conversations */}
          <div className="md:col-span-1 border rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-muted/20">
              <h2 className="font-medium">Conversations</h2>
            </div>
            
            <div className="overflow-y-auto h-[calc(70vh-60px)]">
              {loadingConversations ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : conversations.length > 0 ? (
                conversations.map(conversation => {
                  const otherParticipantId = conversation.participants.find(id => id !== user?.id) || "";
                  const otherParticipantName = conversation.participantNames[otherParticipantId];
                  
                  return (
                    <button
                      key={conversation.id}
                      className={`w-full p-4 text-left border-b hover:bg-muted/20 transition-colors ${
                        selectedConversationId === conversation.id ? 'bg-muted/30' : ''
                      }`}
                      onClick={() => setSelectedConversationId(conversation.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{otherParticipantName}</h3>
                          {conversation.lastMessage && (
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Aucune conversation
                </div>
              )}
            </div>
          </div>
          
          {/* Main chat window */}
          <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
            {selectedConversationId ? (
              <>
                <div className="p-4 border-b bg-muted/20">
                  <h2 className="font-medium">
                    {currentConversation && 
                      currentConversation.participantNames[
                        currentConversation.participants.find(id => id !== user?.id) || ""
                      ]}
                  </h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {loadingMessages ? (
                    <div className="flex justify-center items-center h-32">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    messages.map(message => {
                      const isOwnMessage = message.senderId === user?.id;
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] p-3 rounded-lg ${
                              isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className={`text-xs mt-1 ${
                              isOwnMessage ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Sélectionnez une conversation pour afficher les messages
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
