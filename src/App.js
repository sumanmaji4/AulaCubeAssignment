import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import EditPage from './pages/EditPage'
import AddPage from './pages/AddPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/addtodo', element: <AddPage /> },
      { path: '/edit/:id', element: <EditPage /> },
    ],
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
