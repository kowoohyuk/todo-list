import React, { useState } from 'react'
import styled from 'styled-components'
import CreateTodo from './CreateTodo'
import TodoColumnHead from './TodoColumnHead'
import TodoItem from './TodoItem'
import {
  useTodoState,
  useTodoDispatch,
  useHistoyDispatch,
  useTodoUserNameContext
} from '../Context'

const TodoColumnBlock = styled.div``
const TodoItemsBlock = styled.div``

const TodoColumn = ({ title, todoItems, index }) => {
  const [toggle, setToggle] = useState(false)
  const [todos, setTodos] = useState(todoItems)
  const [count, setCount] = useState(todoItems.length)
  const [inputs, setInputs] = useState({
    title: '',
    content: ''
  })
  const columnId = `column${index}`
  const onClick = () => setToggle(!toggle)
  const dispatch = useTodoDispatch()
  const hisDispatch = useHistoyDispatch()
  const state = useTodoState()
  const name = useTodoUserNameContext()
  const onSubmit = () => {
    setCount(count + 1)
    setInputs({ title: '', content: '' })
    setToggle(!toggle)
    dispatch({ type: 'UPDATEITEM', idx: index, item: { ...inputs } })
    hisDispatch({
      type: '생성',
      itemTitle: { ...inputs }.title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
  }
  const onCancel = () => {
    setToggle(!toggle)
    setInputs({ title: '', content: '' })
  }
  const onChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value })
  }
  const onAllRemove = () => {
    setTodos([])
    dispatch({ type: 'RESETITEM', idx: index })
    setCount(0)
  }
  const onRemove = itemIndex => {
    dispatch({ type: 'REMOVEITEM', idx: index, itemIdx: itemIndex })
    hisDispatch({
      type: 'REMOVE',
      title: '설계하기',
      itemTitle: state[index].todoItems[itemIndex].title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
    setCount(count - 1)
  }

  const onTodoItemChange = (e, index) => {
    setTodos(
      todos.map((v, i) => {
        if (i === index) v[e.target.name] = e.target.value
        return v
      })
    )
  }
  const onDragStart = e => {
    e.dataTransfer.setData('item_id', e.target.id)
    setTimeout(() => {
      //e.target.style.display = 'none'
    }, 0)
  }

  const onDragOver = e => {
    e.stopPropagation()
  }

  const DragOver = e => {
    debugger;
    e.stopPropagation()
    e.preventDefault()
  }
  const onDrop = e => {
    console.log(e)
    e.stopPropagation()
    e.preventDefault()
    const itemId = e.dataTransfer.getData('item_id')
    const item = document.getElementById(itemId)
    // item.style.display = 'block'
    debugger
    console.log(itemId)
  }

  const TodoItems = todoItems.map((v, index) => (
    <TodoItem
      {...v}
      index={index}
      onChange={onTodoItemChange}
      onRemove={onRemove}
      key={index}
      itemId={`${columnId}item${index}`}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    />
  ))
  return (
    <TodoColumnBlock>
      <TodoColumnHead
        toggle={toggle}
        onClick={onClick}
        onAllRemove={onAllRemove}
        count={count}
        title={title}
      ></TodoColumnHead>
      <CreateTodo
        inputs={inputs}
        onChange={onChange}
        onCancel={onCancel}
        onSubmit={onSubmit}
        toggle={toggle}
      ></CreateTodo>
      <TodoItemsBlock id={columnId} onDrop={onDrop} onDragOver={DragOver}>
        {TodoItems}
      </TodoItemsBlock>
    </TodoColumnBlock>
  )
}

export default TodoColumn
