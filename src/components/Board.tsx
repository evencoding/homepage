import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: #303134;
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 300px;
`;

const SBoard = styled.div`
  min-height: 300px;
  flex-grow: 1;
`;

interface IBoardProps {
  boardId: string;
  content: {
    name: string;
    link: string;
  }[];
}

function Board({ boardId, content }: IBoardProps) {
  return (
    <Wrapper>
      <Droppable droppableId={boardId}>
        {(magic) => (
          <SBoard ref={magic.innerRef} {...magic.droppableProps}>
            {content.map((shortCut, index) => (
              <DraggableCard
                key={shortCut.name}
                index={index}
                shortCut={shortCut}
              />
            ))}
            {magic.placeholder}
          </SBoard>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
