export interface Message {
  _id: string;
  sender: {
    _id: string;
    fullName: string;
  };
  chatId: string;
  media: [
    {
      publicId: string;
      url: string;
    }
  ];
  content: string;
  createdAt: string;
}
export interface NewMessage {
  chatId: string;
  message: Message;
}

export interface ChatDetailsMembers {
  avatar: {
    url: string;
    publicId: string;
  };
  _id: string;
  fullName: string;
  userName: string;
}

export interface ChatDetails {
  _id: string;
  avatar: {
    url: string;
    publicId: string;
  }
  bio: string;
  chatName: string;
  isGroupChat: boolean;
  members: ChatDetailsMembers[];
  createdAt: string;
  updatedAt: string;
}
