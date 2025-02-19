import React from "react";
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import Button from "../Button";

const TodoItemBlock = styled.div`
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 0.8rem;
  display: block;
  margin-top: 1rem;
  position: relative;
  button {
    padding: 0.4rem;
    line-height: 0rem;
    position: absolute;
    right: 0.5rem;
    margin-top: -0.3rem;
    &:hover {
      color: #ffcc00;
    }
  }
`;

const Title = styled.input.attrs({
  type: 'text'
})`
  width: 100%;
  font-size: 1rem;
  padding-right: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;

const Content = styled.textarea`
  border: 0;
  resize: none;
  width: 100%;
  overflow-y: visible;
  height: 3rem;
`;

const TodoItem = ({ title, content, index, onChange, onRemove }) => {
  return (
    <TodoItemBlock>
      <Button onClick={() => onRemove(index)}><FaTimes></FaTimes></Button>
      <Title name="title" onChange={({target}) => onChange(target, index)} value={title}/>
      <Content name="content" onChange={({target}) => onChange(target, index)} value={content}/>
    </TodoItemBlock>
  );
}

export default TodoItem;