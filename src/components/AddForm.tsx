type Todo = {
    id: number;
    title: string;
    status: string;
    detail: string;
  }

type Props = {
    todo: Todo,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
}

const AddForm = ({
    todo,
    onSubmit,
    onChange
}: Props) => {
    return (
        <div className='todo-form'>
            <h2>Add</h2>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name="title"
                    placeholder='タイトル'
                    onChange={onChange}
                    value={todo.title}
                />
                <select name="status" value={todo.status} onChange={onChange}>
                    <option value='未着手'>未着手</option>
                    <option value='進行中'>進行中</option>
                    <option value='完了'>完了</option>
                </select>
                <textarea
                    rows={3}
                    name="detail"
                    placeholder='詳細'
                    onChange={onChange}
                    value={todo.detail}
                />
                <button type='submit'>追加</button>
            </form>
        </div>
    )
}

export default AddForm