import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { FaTimes, FaPencilAlt } from 'react-icons/fa'
import EditTodo from './EditTodo'
import Button from '../Button'
import { useTodoState, useTodoDispatch, useHistoyDispatch } from '../Context'

const TodoItemBlock = styled.div`
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 0.8rem;
  display: block;
  margin-top: 1rem;
  position: relative;
  & > button {
    padding: 0.4rem;
    line-height: 0rem;
    position: absolute;
    right: 0.5rem;
    margin-top: -0.3rem;
    &:hover {
      color: #ffcc00;
    }
    &:first-child {
      right: 2rem;
    }
  }
`

const TodoItemContent = styled.div`
  display: ${({ toggle }) => (!toggle ? 'block' : 'none')};
`

const Title = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  font-size: 1.2rem;
  padding-right: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`

const Content = styled.textarea`
  border: 0;
  resize: none;
  font-size: 1rem;
  width: 100%;
  overflow-y: visible;
  height: 3rem;
  &:focus {
    outline: none;
  }
`

// const dragSate = useRef({ pageX: 0, pageY: 0 })

const TodoItem = ({
  columnIdx,
  itemId,
  title,
  content,
  index,
  onChange,
  onRemove
}) => {
  const dragItem = useRef()
  const dragNode = useRef()
  const dragContext = useRef()

  const [dragging, SetDargging] = useState(false)
  const dispatch = useTodoDispatch()
  const state = useTodoState()
  const onDragStart = (e, idx, params) => {
    dragItem.current = idx
    dragNode.current = e.target
    dragContext.current = params
    console.log(idx, "str")
    e.dataTransfer.setData('dragItem', idx)
    setTimeout(() => {
      SetDargging(true)
      e.target.style.opacity = '0.4'
    }, 0)
  }
  const onDragEnd = e => {
    if (dragging) e.target.style.opacity = '1'
    // console.log(dragNode, 'end')
    SetDargging(false)
    // dragNode.current.removeEventListener('dragend', onDragEnd)
    // dragItem.current = null
    // dragNode.current = null
    // dragContext.current = null
  }
  const onDargEnter = (e, params) => {
    const currentItem = dragItem.current
    console.log(params, 'enter')
    console.log(dragItem.current, 'curr')
    // console.log(e.dataTransfer.getData('dragItem'))
    // if (!dragNode.current) {
    //   // debugger
    //   console.log(dragNode, 'curr', params)
    //   // let temp = [...state]
    //   // temp[params.columnIdx].todoItems[currentItem.index] =
    //   //   temp[params.columnIdx].todoItems[params.index]
    //   // temp[params.columnIdx].todoItems[params.index] = dragContext.current
    //   // console.log(temp)
    //   // dispatch({
    //   //   type: 'UPDATEITEM',
    //   //   idx: params.columnIdx,
    //   //   todos: temp
    //   // })
    // }
  }

  // const onDragOver = e => {
  //   // const gapY = e.pageY - dragSate.current.pageY
  //   // // e.pageX - dragSate.current.pageX, 'X'
  //   // const i = e.target.id.replace(/column/gi,"").replace(/item/gi,"_").split("_");

  //   e.stopPropagation()
  // }
  //  const onDrop = e => {

  //   e.preventDefault()
  //   e.stopPropagation()

  // }

  const [toggle, setToggle] = useState(false)
  const onToggle = () => setToggle(!toggle)
  const onTextChange = inputs => {
    // setInputs(inputs);
    onChange(inputs, index)
    onToggle()
  }

  return (
    <TodoItemBlock
      // id={itemId}
      draggable
      onDragStart={e =>
        onDragStart(e, { columnIdx, index }, { title, content })
      }
      // onDragOver={onDragOver}
      // onDrop={onDrop}
      onDragEnd={onDragEnd}
      // onDragEnter={
      //   dragging
      //     ? e => {
      //         onDargEnter(e, { columnIdx, index })
      //       }
      //     : null
      // }
      onDragEnter={e => {
        onDargEnter(e, { columnIdx, index })
      }}
    >
      <Button onClick={onToggle}>
        <FaPencilAlt />
      </Button>
      <Button onClick={() => onRemove(index)}>
        <FaTimes />
      </Button>
      <TodoItemContent toggle={toggle}>
        <Title name='title' value={title} readOnly />
        <Content name='content' value={content} readOnly />
      </TodoItemContent>
      <EditTodo
        toggle={toggle}
        onToggle={onToggle}
        title={title}
        content={content}
        onTextChange={onTextChange}
      />
    </TodoItemBlock>
  )
}

export default TodoItem
