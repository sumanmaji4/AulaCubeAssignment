import React from 'react'
import { useParams } from 'react-router-dom'
import TodoForm from '../components/TodoForm'

function EditPage() {
  const params = useParams()
  const id = params.id
  return <TodoForm id={id} />
}

export default EditPage
