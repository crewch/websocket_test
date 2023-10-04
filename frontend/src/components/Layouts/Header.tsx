import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Socket } from 'socket.io-client'

interface HeaderProps {
	socket: Socket
}

const Header: FC<HeaderProps> = ({ socket }) => {
	return (
		<>
			<header className='relative z-10 h-12 bg-slate-900 flex justify-end items-center px-3'>
				<nav className='text-white text-xl flex gap-4 '>
					<Link
						to='/'
						className='transition-all hover:underline hover:scale-110 hover:text-yellow-400'
						onClick={() => {
							socket.emit('logout', {
								user: localStorage.getItem('user'),
								socketId: socket.id,
							})
							localStorage.removeItem('user')
						}}
					>
						Sign out
					</Link>
				</nav>
			</header>
			<Outlet />
		</>
	)
}

export default Header
