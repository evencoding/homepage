import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { shortCutState } from "../atoms";
import Board from "./Board";
import AddDelete from "./AddDelete";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 80%;
  min-width: 660px;
  gap: 15px;
  grid-template-columns: repeat(4, 1fr);
`;

const AddAndDelete = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

function ShortCut() {
  const [shortCuts, setShortCut] = useRecoilState(shortCutState);
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      let copyShortCut = [...shortCuts[source.droppableId]];
      const link = copyShortCut[source.index].link;
      copyShortCut.splice(source.index, 1);
      copyShortCut.splice(destination.index, 0, { name: draggableId, link });
      setShortCut({
        ...shortCuts,
        [source.droppableId]: copyShortCut,
      });
      localStorage.setItem(
        "shortCuts",
        JSON.stringify({
          ...shortCuts,
          [source.droppableId]: copyShortCut,
        })
      );
    }
    if (destination.droppableId === "delete") {
      let copyShortCut = [...shortCuts[source.droppableId]];
      copyShortCut.splice(source.index, 1);
      setShortCut({
        ...shortCuts,
        [source.droppableId]: copyShortCut,
      });
      localStorage.setItem(
        "shortCuts",
        JSON.stringify({
          ...shortCuts,
          [source.droppableId]: copyShortCut,
        })
      );
    } else if (destination.droppableId !== source.droppableId) {
      let copyDestination = [...shortCuts[destination.droppableId]];
      let copySource = [...shortCuts[source.droppableId]];
      const link = copySource[source.index].link;
      copyDestination.splice(destination.index, 0, { name: draggableId, link });
      copySource.splice(source.index, 1);
      setShortCut({
        ...shortCuts,
        [source.droppableId]: copySource,
        [destination.droppableId]: copyDestination,
      });
      localStorage.setItem(
        "shortCuts",
        JSON.stringify({
          ...shortCuts,
          [source.droppableId]: copySource,
          [destination.droppableId]: copyDestination,
        })
      );
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(shortCuts).map((boardId) => (
            <Board
              key={boardId}
              boardId={boardId}
              content={shortCuts[boardId]}
            />
          ))}
        </Boards>
      </Wrapper>
      <AddAndDelete>
        <AddDelete />
      </AddAndDelete>
    </DragDropContext>
  );
}

export default ShortCut;
