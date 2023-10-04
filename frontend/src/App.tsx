import { io } from 'socket.io-client'
import { Route, Routes } from 'react-router-dom'
import Home from './components/screens/Home/Home'
import Chat from './components/screens/Chat/Chat'
import Header from './components/Layouts/Header'

const socket = io('http://localhost:5000')

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home socket={socket} />} />
			<Route element={<Header socket={socket} />}>
				<Route path='/chat' element={<Chat socket={socket} />} />
			</Route>
		</Routes>
	)
}

export default App
