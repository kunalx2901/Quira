import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getStreamToken } from '../lib/api';
import { useQuery } from '@tanstack/react-query';
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import  useAuthUser from '../hooks/useAuthUser';
import ChatLoader from '../components/ChatLoader';

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from 'stream-chat-react';

import { useThemeStore } from '../store/useThemeStore';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_URL; 

const ChatPage = () => {
  const {theme,setTheme} = useThemeStore();
  const { id:targetUserId} = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const {authUser} = useAuthUser();

  const {data:TokenData, isLoading:loadingStreamToken} = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser, // Only fetch if authUser is available 
  });

  useEffect(()=>{
    const initChat = async()=>{
      if(!TokenData?.token || !authUser){
        return;
      }

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser({
          id:authUser._id,
          name:authUser.fullName,
          image:authUser.profileAvatar,
        }, TokenData.token);

        // creating a channel id unique for the user to chat
        const channelId = [authUser._id, targetUserId].sort().join('-');
        const currentChannel = client.channel('messaging', channelId, {
          members:[authUser._id, targetUserId],
        })

        // to see for any changes in the channel
        await currentChannel.watch();
        setChatClient(client);
        setChannel(currentChannel);
        setLoading(false);

      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Failed to initialize chat. Please try again later.");
      }finally{
        setLoading(false);
      }
    }
    initChat();
  },[TokenData, authUser, targetUserId]);

  if(loading || !chatClient || !channel ){
    return <ChatLoader />;
  }

  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput focus />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
}


export default ChatPage