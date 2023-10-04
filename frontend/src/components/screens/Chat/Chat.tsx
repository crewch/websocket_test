import { FC, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { Navigate } from 'react-router-dom'
import SideBar from '../../shared/SideBar/SideBar'
import ChatContainer from '../../shared/ChatContainer/ChatContainer'
import MessageContainer from '../../shared/MessageContainer/MessageContainer'
import { Message } from '../../../shared/interfaces/Message'

interface ChatProps {
	socket: Socket
}

const Chat: FC<ChatProps> = ({ socket }) => {
	const [messages, setMessages] = useState<Message[]>([])

	useEffect(() => {
		socket.on('response', (data: Message) => setMessages([...messages, data]))
	}, [messages, socket])

	if (!localStorage.getItem('user')) {
		return <Navigate to='/' />
	}

	return (
		<main className='absolute pt-14 p-3 top-0 left-0 h-full w-full bg-gradient-to-tl from-[#0093E9] to-[#80D0C7] grid grid-cols-[5rem_1fr] lg:grid-cols-[10rem_1fr] grid-rows-[1fr_4rem] gap-3'>
			<SideBar socket={socket} />
			<ChatContainer messages={messages} socket={socket} />
			<MessageContainer socket={socket} />
		</main>
	)
}

export default Chat
