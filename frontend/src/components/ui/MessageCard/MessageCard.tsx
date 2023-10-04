import classNames from 'classnames'
import { FC } from 'react'

interface MessageCardProps {
	author: string
	text: string
}

const MessageCard: FC<MessageCardProps> = ({ author, text }) => {
	const user = localStorage.getItem('user')

	return (
		<div
			className={classNames(
				{ 'ml-auto': author === user },
				{ 'mr-auto': author !== user },
				'w-max-[95%]'
			)}
		>
			<p className={classNames({ 'text-end': author === user })}>{author}</p>
			<div
				className={classNames(
					{ 'bg-gray-300': author !== user },
					{ 'bg-green-300': author === user },
					'rounded',
					'p-2',
					'break-all'
				)}
			>
				<p className='tracking-wide'>{text}</p>
			</div>
		</div>
	)
}

export default MessageCard
