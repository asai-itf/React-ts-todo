import React, { useEffect, useState } from 'react';
import './App.css';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';

function App() {

  const [todo, setTodo] = useState({
    id: 1,
    title: '',
    status: '未着手',
    detail: ''
  })
  const [todos, setTodos] = useState<Todos>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editTodo, setEditTodo] = useState<Todo>({
    id: 0,
    title: '',
    status: '',
    detail: ''
  })
  const [filter, setFilter] = useState('すべて')
  const [filteredTodos, setFilteredTodos] = useState<Todos>([])

  type Todo = {
    id: number;
    title: string;
    status: string;
    detail: string;
  }
  
  type Todos = Todo[]

  // Addフォームに入力されたtitle, status, detailを取得
  const handleAddFormChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    switch (e.target.name) {
      case 'title':
        setTodo({ ...todo, title: e.target.value })
        break
      case 'status':
        setTodo({ ...todo, status: e.target.value })
        break
      case 'detail':
        setTodo({ ...todo, detail: e.target.value })
        break
      default:
        break
    }
  }

  // Editフォームで編集されたtitle, status, detailを取得
  const handleEditFormChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    switch (e.target.name) {
      case 'title':
        setEditTodo({ ...editTodo, title: e.target.value })
        break
      case 'status':
        setEditTodo({ ...editTodo, status: e.target.value })
        break
      case 'detail':
        setEditTodo({ ...editTodo, detail: e.target.value })
        break
      default:
        break
    }
  }

  // 追加ボタンを押されたらtodosに加えてテキストボックスを初期化
  const handleAddSubmit:(e: React.FormEvent<HTMLFormElement>)=>void = (e) => {
    e.preventDefault()

    setTodos([...todos, todo])

    setTodo((prevTodo) => ({
      id: prevTodo.id + 1,
      title: '',
      status: '未着手',
      detail: ''
    }))
  }

  // 削除ボタンを押されたときの処理
  const handleDeleteClick: (deleteTodo: Todo) => void = (deleteTodo) => {
    const newTodos = todos.filter((todo)=>todo !== deleteTodo)
    setTodos(newTodos)
  }

  // 編集ボタンを押された時の処理
  const handleEditClick: (todo:Todo) => void = (todo) => {
    setIsEditing(true)
    setEditTodo(todo)
  }

  // 編集画面でキャンセルボタン
  const handleEditCancel = () => {
    setIsEditing(false)
  }

  // 編集後にOKボタンを押したときの処理
  const handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault()

    setTodos(todos.map((todo) => {
      if (todo.id === editTodo.id) {
        return editTodo
      } else {
        return todo
      }
    }))

    setIsEditing(false)
  }

  // statusフィルターのstatusを取得
  const handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (e) => {
    setFilter(e.target.value)
  }

  // フィルターとtodosが変更されるたびにフィルターをかける
  useEffect(() => {
    if (filter === 'すべて') {
      setFilteredTodos(todos)
    } else {
      setFilteredTodos(todos.filter((todo) => todo.status === filter))
    }
  }, [filter, todos])


  return (
    <>
      <div className='todo-item'>
        <h2>TODO</h2>
        <div className='filter'>
          <select value={filter} onChange={handleFilterChange}>
            <option value='すべて'>すべて</option>
            <option value='未着手'>未着手</option>
            <option value='進行中'>進行中</option>
            <option value='完了'>完了</option>
          </select>
        </div>
        <ul>
          {filteredTodos.map((todo: Todo) => {
            return (
              <li key={todo.id}>
                <div className='list-row'>
                  <p>{todo.id} :【{todo.status}】 <span>{todo.title}</span><br />　{todo.detail}</p>
                  <button onClick={() => handleEditClick(todo)}>編集</button>
                  <button onClick={() => handleDeleteClick(todo)}>削除</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {isEditing ? (
        <EditForm
          todo={editTodo}
          onSubmit={handleEditSubmit}
          onChange={handleEditFormChange}
          onClick={handleEditCancel}
        />
      ) : (
        <AddForm
          todo={todo}
          onSubmit={handleAddSubmit}
          onChange={handleAddFormChange}
        />
      )}

    </>
  );
}

export default App;
