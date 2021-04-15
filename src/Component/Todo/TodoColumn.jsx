import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import CreateTodo from './CreateTodo'
import TodoColumnHead from './TodoColumnHead'
import TodoItem from './TodoItem'
import {
  useTodoState,
  useTodoDispatch,
  useHistoyDispatch,
} from '../Context'

const TodoColumnBlock = styled.div``
const TodoItemsBlock = styled.div``

const TodoColumn = ({ title, index }) => {
  const columnId = `column${index}`
  const onClick = () => setToggle(!toggle)
  const dispatch = useTodoDispatch()
  const hisDispatch = useHistoyDispatch()
  const state = useTodoState()
  const todoItems = state[index].todoItems;
  const [toggle, setToggle] = useState(false)
  const [count, setCount] = useState(todoItems.length)
  const onSubmit = inputs => {
    dispatch({ type: 'CREATEITEM', idx: index, item: { ...inputs } })
    hisDispatch({
      type: '생성',
      itemTitle: { ...inputs }.title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    });
    setToggle(!toggle);
    setCount(count + 1);
  }

  const onAllRemove = () => {
    dispatch({ type: 'RESETITEM', idx: index })
    setCount(0)
  }
  const onRemove = itemIndex => {
    hisDispatch({
      type: '삭제',
      title: '설계하기',
      itemTitle: state[index].todoItems[itemIndex].title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
    const tmp = todoItems.filter((v, i) => i !== itemIndex);
    dispatch({ type: 'REMOVEITEM', idx: index, todos : tmp });
    setCount(count - 1);
  }

  const onTodoItemChange = (value, idx) => {
    const tmp = todoItems.map((v, i) => {
      if (i === idx) v = value;
      return v;
    })
    dispatch({ type: 'UPDATEITEM', idx: index, todos : tmp });
    hisDispatch({
      type: '수정',
      itemTitle: value.title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
  }
  const dragSate = useRef({ pageX: 0, pageY: 0 })
  const [drag, SetDarg] = useState(false)
  const onDragStart = e => {
    dragSate.current = { pageX: e.pageX, pageY: e.pageY }
    e.dataTransfer.setData('item_id', e.target.id)
    e.dataTransfer.setData('item_Y', e.pageY)
    SetDarg(drag => true)
    setTimeout(() => {
      e.target.style.opacity = '0.4'
    }, 0)
  }

  const onDragOver = e => {
    console.log(e.pageY - dragSate.current.pageY, 'Y')
    console.log(e.pageX - dragSate.current.pageX, 'X')
    e.stopPropagation()
  }

  const DragOver = e => {
    e.preventDefault()
  }

  const onDragEnd = e => {
    if(drag)  e.target.style.opacity = '1'
  }
  const onDrop = e => {
    SetDarg(!drag)
    e.preventDefault()
    e.stopPropagation()
    const itemId = e.dataTransfer.getData('item_id')
    const item = document.getElementById(itemId)
    //  item.style.display = 'block'
    // e.target.insertBefore(item,);
    item.style.opacity = '1'
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
      onDragEnd={onDragEnd}
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
        onSubmit={onSubmit}
        toggle={toggle}
        setToggle={setToggle}
      ></CreateTodo>
      <TodoItemsBlock id={columnId} onDrop={onDrop} onDragOver={DragOver}>
        {TodoItems}
      </TodoItemsBlock>
    </TodoColumnBlock>
  )
}

export default TodoColumn
