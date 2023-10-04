import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'

interface HomeProps {
	socket: Socket
}

const Home: FC<HomeProps> = ({ socket }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		localStorage.setItem('user', user)
		setUser('')
		socket.emit('newUser', { user, socketId: socket.id })
		navigate('/chat')
	}

	return (
		<main className='absolute h-full w-full flex flex-col items-center justify-center gap-4 bg-gradient-to-tr from-[#4158D0] via-[#C850C0] to-[#FFCC70]'>
			<h1 className='text-3xl transition-all hover:scale-110 hover:skew-x-2 hover:skew-y-2 cursor-default'>
				Home page
			</h1>
			<form
				onSubmit={handleSubmit}
				className='shadow-lg h-80 w-96 px-20 rounded-xl bg-white relative'
			>
				<h2 className='text-2xl absolute top-5 left-1/2 -translate-x-1/2'>
					Вход в чат
				</h2>
				<div className='h-full flex flex-col justify-center gap-4'>
					<input
						type='text'
						placeholder='Введите имя пользователя*'
						required
						value={user}
						onChange={e => setUser(e.target.value)}
						className='outline-none border-b-2 border-black w-full mt-0'
					/>
					<button
						type='submit'
						className='rounded bg-slate-900 text-white text-xl transition-all hover:-translate-y-[0.2rem] active:-translate-y-0 hover:bg-yellow-400 hover:text-slate-900 active:bg-green-400 disabled:bg-slate-400/40 disabled:translate-y-0 disabled:hover:translate-y-0 disabled:hover:text-white'
						disabled={!user || user.length > 15}
					>
						Войти
					</button>
				</div>
			</form>
		</main>
	)
}

export default Home
