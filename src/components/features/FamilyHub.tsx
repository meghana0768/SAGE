'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Users, Plus, ChevronRight, MessageCircle, X, Send, Check, XCircle
} from '@/components/icons';
import type { FamilyMember, FamilyRequest, FamilyMessage } from '@/types';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onClick: () => void;
}

function FamilyMemberCard({ member, onClick }: FamilyMemberCardProps) {
  const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const unreadCount = member.messages.filter(m => !m.read).length;
  
  return (
    <Card hover onClick={onClick}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-sage-light)] to-[var(--color-sage)] flex items-center justify-center text-white text-xl font-semibold">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold text-[var(--color-charcoal)]">
              {member.name}
            </h3>
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--color-terracotta)] text-white text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-sm text-[var(--color-stone)]">{member.relationship}</p>
          {member.status === 'pending' && (
            <p className="text-xs text-[var(--color-terracotta)] mt-1">Pending connection</p>
          )}
        </div>
        <ChevronRight className="text-[var(--color-stone)]" />
      </div>
    </Card>
  );
}

interface FamilyMemberDetailProps {
  member: FamilyMember;
  onBack: () => void;
  onRemove?: () => void;
}

function FamilyMemberDetail({ member, onBack, onRemove }: FamilyMemberDetailProps) {
  const [messageText, setMessageText] = useState('');
  const { user, sendFamilyMessage, markFamilyMessageRead, currentUserId } = useStore();
  
  const currentMember = user?.familyMembers?.find(m => m.id === member.id) || member;
  const initials = currentMember.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  // Mark messages as read when viewing
  const unreadMessages = currentMember.messages.filter(m => !m.read && m.fromUsername !== currentUserId);
  unreadMessages.forEach(msg => {
    markFamilyMessageRead(msg.id);
  });

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentMember.username) return;
    sendFamilyMessage(currentMember.username, messageText.trim());
    setMessageText('');
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="text-[var(--color-sage)] font-medium flex items-center gap-1"
        >
          ← Back to family
        </button>
        {onRemove && (
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to remove ${currentMember.name} from your family members?`)) {
                onRemove();
              }
            }}
            className="text-[var(--color-terracotta)] font-medium flex items-center gap-1"
          >
            <X size={18} />
            Remove
          </button>
        )}
      </div>
      
      {/* Profile header */}
      <Card>
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-sage-light)] to-[var(--color-sage)] flex items-center justify-center text-white text-3xl font-semibold mx-auto mb-4">
            {initials}
          </div>
          <h2 className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
            {currentMember.name}
          </h2>
          <p className="text-[var(--color-stone)]">{currentMember.relationship}</p>
          {currentMember.username && (
            <p className="text-xs text-[var(--color-sage)] mt-1">@{currentMember.username}</p>
          )}
        </div>
      </Card>
      
      {/* Messages */}
      <Card>
        <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-4 flex items-center gap-2">
          <MessageCircle size={18} className="text-[var(--color-sage)]" />
          Messages
        </h3>
        
        <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
          {currentMember.messages.length > 0 ? (
            currentMember.messages.map(message => {
              const isFromMe = message.fromUsername === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      isFromMe
                        ? 'bg-[var(--color-sage)] text-white'
                        : 'bg-[var(--color-sand)] text-[var(--color-charcoal)]'
                    }`}
                  >
                    {!isFromMe && (
                      <p className="text-xs opacity-75 mb-1">{message.fromName}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isFromMe ? 'opacity-75' : 'text-[var(--color-stone)]'}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-[var(--color-stone)] py-6">
              No messages yet. Start a conversation!
            </p>
          )}
        </div>
        
        {/* Message input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-xl border-2 border-[var(--color-sand)] focus:border-[var(--color-sage)] outline-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            icon={<Send size={18} />}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}

interface AddFamilyMemberFormProps {
  onRequest: (username: string, name: string, relationship: string) => void;
  onCancel: () => void;
}

function AddFamilyMemberForm({ onRequest, onCancel }: AddFamilyMemberFormProps) {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (!name || !relationship || !username.trim()) return;
    onRequest(username.trim(), name, relationship);
    setName('');
    setRelationship('');
    setUsername('');
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-semibold text-[var(--color-charcoal)]">
          Request Family Connection
        </h3>
        <button onClick={onCancel}>
          <X size={20} className="text-[var(--color-stone)]" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-[var(--color-stone)] block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name..."
            className="w-full p-3 rounded-xl border-2 border-[var(--color-sand)] focus:border-[var(--color-sage)] outline-none"
          />
        </div>
        
        <div>
          <label className="text-sm text-[var(--color-stone)] block mb-1">Relationship</label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            className="w-full p-3 rounded-xl border-2 border-[var(--color-sand)] focus:border-[var(--color-sage)] outline-none bg-white"
          >
            <option value="">Select relationship...</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Grandson">Grandson</option>
            <option value="Granddaughter">Granddaughter</option>
            <option value="Spouse">Spouse</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-[var(--color-stone)] block mb-1">
            Username <span className="text-[var(--color-terracotta)]">*</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Their Sage username..."
            className="w-full p-3 rounded-xl border-2 border-[var(--color-sand)] focus:border-[var(--color-sage)] outline-none"
          />
          <p className="text-xs text-[var(--color-stone)] mt-1">
            Enter their username to send a connection request. They must accept to connect.
          </p>
        </div>
        
        <Button 
          onClick={handleSubmit} 
          disabled={!name || !relationship || !username.trim()}
          fullWidth
        >
          Send Request
        </Button>
      </div>
    </Card>
  );
}

interface FamilyRequestCardProps {
  request: FamilyRequest;
  onAccept: () => void;
  onReject: () => void;
}

function FamilyRequestCard({ request, onAccept, onReject }: FamilyRequestCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-[var(--color-charcoal)]">
            {request.fromName}
          </h3>
          <p className="text-sm text-[var(--color-stone)]">{request.relationship}</p>
          <p className="text-xs text-[var(--color-sage)] mt-1">@{request.fromUsername}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Check size={16} />}
            onClick={onAccept}
          >
            Accept
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<XCircle size={16} />}
            onClick={onReject}
          >
            Reject
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function FamilyHub() {
  const { 
    user, 
    removeFamilyMember, 
    requestFamilyConnection,
    acceptFamilyRequest,
    rejectFamilyRequest,
    familyRequests,
    currentUserId
  } = useStore();
  
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  
  const familyMembers = user?.familyMembers || [];
  const pendingRequests = familyRequests.filter(r => r.status === 'pending' && r.toUsername === currentUserId);

  const handleRequestConnection = (username: string, name: string, relationship: string) => {
    requestFamilyConnection(username, name, relationship);
    setShowAddForm(false);
    alert('Connection request sent! They will need to accept it.');
  };

  const handleSelectMember = (member: FamilyMember) => {
    setSelectedMember(member);
  };

  const handleRemoveMember = (memberId: string) => {
    removeFamilyMember(memberId);
    setSelectedMember(null);
  };

  // View for family requests
  if (showRequests) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
              Connection Requests
            </h2>
            <p className="text-[var(--color-stone)]">
              {pendingRequests.length} pending request{pendingRequests.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowRequests(false)}
            className="p-2 rounded-xl hover:bg-[var(--color-sand)] transition-colors"
          >
            <ChevronRight size={24} className="text-[var(--color-stone)] rotate-180" />
          </button>
        </div>

        {pendingRequests.length === 0 ? (
          <Card className="p-8 text-center">
            <Users size={48} className="text-[var(--color-sage)] mx-auto mb-4 opacity-50" />
            <p className="text-[var(--color-stone)]">No pending requests</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingRequests.map(request => (
              <FamilyRequestCard
                key={request.id}
                request={request}
                onAccept={() => {
                  acceptFamilyRequest(request.id);
                  setShowRequests(false);
                }}
                onReject={() => {
                  rejectFamilyRequest(request.id);
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (selectedMember) {
    const latestMember = user?.familyMembers?.find(m => m.id === selectedMember.id) || selectedMember;
    return (
      <FamilyMemberDetail 
        member={latestMember} 
        onBack={() => setSelectedMember(null)}
        onRemove={() => handleRemoveMember(latestMember.id)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
            Family Hub
          </h2>
          <p className="text-[var(--color-stone)]">
            Connect and message with family members
          </p>
        </div>
        <div className="flex gap-2">
          {pendingRequests.length > 0 && (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => setShowRequests(true)}
            >
              Requests ({pendingRequests.length})
            </Button>
          )}
          <Button 
            variant="secondary" 
            size="sm" 
            icon={<Plus size={16} />}
            onClick={() => setShowAddForm(true)}
          >
            Add
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <AddFamilyMemberForm 
              onRequest={handleRequestConnection}
              onCancel={() => setShowAddForm(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 stagger-children">
        {familyMembers.map(member => (
          <FamilyMemberCard
            key={member.id}
            member={member}
            onClick={() => handleSelectMember(member)}
          />
        ))}
      </div>

      {familyMembers.length === 0 && !showAddForm && (
        <Card className="text-center py-8">
          <Users size={48} className="mx-auto text-[var(--color-stone)] mb-4" />
          <h3 className="font-display font-semibold text-[var(--color-charcoal)] mb-2">
            No family members yet
          </h3>
          <p className="text-[var(--color-stone)] mb-4">
            Send connection requests to family members to start messaging.
          </p>
          <Button onClick={() => setShowAddForm(true)} icon={<Plus size={18} />}>
            Request Connection
          </Button>
        </Card>
      )}
    </div>
  );
}
