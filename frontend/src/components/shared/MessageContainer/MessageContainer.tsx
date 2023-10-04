import { FC, FormEvent, useState } from 'react'
import { Socket } from 'socket.io-client'

interface MessageContainerProps {
	socket: Socket
}

const MessageContainer: FC<MessageContainerProps> = ({ socket }) => {
	const [text, setText] = useState('')

	const isTyping = () =>
		socket.emit('typing', `${localStorage.getItem('user')} is typing`)

	const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (localStorage.getItem('user')) {
			socket.emit('message', {
				socketId: socket.id,
				id: `${socket.id}`,
				name: localStorage.getItem('user'),
				text,
			})
		}

		setText('')
	}

	return (
		<form
			onSubmit={handelSubmit}
			className='col-span-2 lg:col-span-1 w-full flex gap-2'
		>
			<input
				type='text'
				value={text}
				placeholder='Сообщение'
				onChange={e => setText(e.target.value)}
				onKeyDown={isTyping}
				required
				className='w-full outline-none rounded p-2 border-slate-900 text-xl'
			/>
			<button
				type='submit'
				disabled={!text.trim()}
				className='rounded bg-slate-900 text-white text-xl transition-all hover:bg-yellow-400 hover:text-slate-900 disabled:bg-slate-500 disabled:hover:text-white px-1 disabled:pointer-events-none hover:-translate-y-1 active:translate-y-0'
			>
				Отправить
			</button>
		</form>
	)
}

export default MessageContainer
