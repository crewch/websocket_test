import { FC, useEffect, useState } from 'react'
import MessageCard from '../../ui/MessageCard/MessageCard'
import { Message } from '../../../shared/interfaces/Message'
import { Socket } from 'socket.io-client'

interface ChatContainerProps {
	socket: Socket
	messages: Message[]
}

const ChatContainer: FC<ChatContainerProps> = ({ messages, socket }) => {
	const [status, setStatus] = useState('')

	useEffect(() => {
		socket.on('responseTyping', data => {
			setStatus(data)
			setTimeout(() => setStatus(''), 1000)
		})
	}, [socket])

	return (
		<div className='overflow-hidden'>
			<ul className='h-full overflow-auto flex flex-col gap-5 px-2'>
				{!messages.length && (
					<h2 className='text-4xl col-span-2 mx-auto'>Напишите сообщение</h2>
				)}
				{messages?.map((message, index) => (
					<MessageCard author={message.name} text={message.text} key={index} />
				))}
				<div className=''>
					<p className='tracking-wide'>{status}</p>
				</div>
			</ul>
		</div>
	)
}

export default ChatContainer
