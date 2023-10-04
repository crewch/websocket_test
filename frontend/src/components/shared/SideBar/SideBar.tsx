import { FC, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { User } from '../../../shared/interfaces/User'

interface SideBarProps {
	socket: Socket
}

const SideBar: FC<SideBarProps> = ({ socket }) => {
	const [users, setUsers] = useState<User[]>([])

	useEffect(() => {
		socket.on('responseNewUser', (data: User[]) => setUsers(data))
	}, [users, socket])

	return (
		<div className='row-span-1 lg:row-span-2 flex flex-col gap-3 overflow-hidden'>
			<h4 className='text-3xl'>Users</h4>
			<ul className='flex flex-col gap-1 overflow-auto'>
				{users.map(user => (
					<li key={user.user + Math.random()}>{user.user}</li>
				))}
			</ul>
		</div>
	)
}

export default SideBar
