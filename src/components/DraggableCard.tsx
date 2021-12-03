import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICard {
  isDragging: boolean;
}

const Card = styled.div<ICard>`
  display: flex;
  padding: 0 10px;
  &:not(:last-child) {
    margin-bottom: 8px;
  }
  a {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDragging ? "#192a56" : "#202124")};
    border-radius: 10px;
    width: 100%;
    height: 40px;
    div {
      position: absolute;
      right: 0px;
      display: flex;
      height: 40px;
      width: 30px;
      justify-content: center;
      align-items: center;
      span {
        color: #40739e;
      }
    }
  }
`;

interface IDraggableCardProps {
  shortCut: {
    name: string;
    link: string;
  };
  index: number;
}

function DraggableCard({ shortCut, index }: IDraggableCardProps) {
  return (
    <Draggable key={shortCut.name} draggableId={shortCut.name} index={index}>
      {(magic, info) => (
        <Card
          isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
        >
          <a href={shortCut.link}>
            {shortCut.name}
            <div {...magic.dragHandleProps}>
              <span>⇅</span>
            </div>
          </a>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
