import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import CreateTodo from './CreateTodo'
import TodoColumnHead from './TodoColumnHead'
import TodoItem from './TodoItem'
import { useTodoState, useTodoDispatch, useHistoyDispatch } from '../Context'

const TodoColumnBlock = styled.div``
const TodoItemsBlock = styled.div``

const TodoColumn = ({ title, index }) => {
  const columnId = `column${index}`
  const onClick = () => setToggle(!toggle)
  const dispatch = useTodoDispatch()
  const hisDispatch = useHistoyDispatch()
  const state = useTodoState()
  const todoItems = state[index].todoItems
  const [toggle, setToggle] = useState(false)
  const [count, setCount] = useState(todoItems.length)
  const onSubmit = inputs => {
    dispatch({ type: 'CREATEITEM', idx: index, item: { ...inputs } })
    hisDispatch({
      type: '생성',
      itemTitle: { ...inputs }.title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
    setToggle(!toggle)
    setCount(count + 1)
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
    const tmp = todoItems.filter((v, i) => i !== itemIndex)
    dispatch({ type: 'REMOVEITEM', idx: index, todos: tmp })
    setCount(count - 1)
  }

  const onTodoItemChange = (value, idx) => {
    const tmp = todoItems.map((v, i) => {
      if (i === idx) v = value
      return v
    })
    dispatch({ type: 'UPDATEITEM', idx: index, todos: tmp })
    hisDispatch({
      type: '수정',
      itemTitle: value.title,
      columnTitle: state[index].title,
      time: new Date().toUTCString()
    })
  }
  // const dragItem = useRef()
  // const dragNode = useRef()

  // // const dragSate = useRef({ pageX: 0, pageY: 0 })
  // const [dragging, SetDargging] = useState(false)

  // const onDargEnter = (e, params) => {
  //   const currentItem = dragItem.current
  //   if (e.target !== dragNode.current) {
  //   }
  // }

  // const onDragStart = (e, idx, params) => {
  //   // dragSate.current = { pageX: e.pageX, pageY: e.pageY }
  //   // e.dataTransfer.setData('item_id', e.target.id)
  //   dragItem.current = idx
  //   dragNode.current = e.target
  //   console.log(idx, params)
    
  //   setTimeout(() => {
  //     SetDargging(true)
  //     e.target.style.opacity = '0.4'
  //   }, 0)
  // }

  // const onDragOver = e => {
  //   // const gapY = e.pageY - dragSate.current.pageY
  //   // // e.pageX - dragSate.current.pageX, 'X'
  //   // const i = e.target.id.replace(/column/gi,"").replace(/item/gi,"_").split("_");

  //   e.stopPropagation()
  // }

  // const DragOver = e => {
  //   e.preventDefault()
  // }

  // const onDragEnd = e => {
  //   if (dragging) e.target.style.opacity = '1'
  //   SetDargging(!dragging)
  //   dragItem.current = null
  //   dragNode.current = null
  // }
  // const onDrop = e => {
  //   SetDargging(!dragging)
  //   e.preventDefault()
  //   e.stopPropagation()
  //   const itemId = e.dataTransfer.getData('item_id')
  //   const item = document.getElementById(itemId)
  //   //  item.style.display = 'block'
  //   // e.target.insertBefore(item,);
  //   e.target.appendChild(item)
  //   item.style.opacity = '1'
  // }

  const TodoItems = todoItems.map((v, idx) => (
    <TodoItem
      {...v}
      index={idx}
      onChange={onTodoItemChange}
      onRemove={onRemove}
      key={idx}
      columnIdx={index}
      itemId={`${columnId}item${idx}`}
      // onDragStart={onDragStart}
      // onDragOver={onDragOver}
      // onDragEnd={onDragEnd}
      // onDragEnter={onDargEnter}
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
      <TodoItemsBlock id={columnId} >
        {TodoItems}
      </TodoItemsBlock>
    </TodoColumnBlock>
  )
}

export default TodoColumn
