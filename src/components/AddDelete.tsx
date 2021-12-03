import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ISourtCutState, shortCutState } from "../atoms";

interface IGarbage {
  isDraggingOver: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 25px;
`;

const Sbutton = styled.button`
  margin-right: 25px;
  border-radius: 10px;
  height: 30px;
  border: none;
  background-color: #303134;
  color: white;
  &:hover {
    cursor: pointer;
  }
`;

const AddForm = styled.div`
  margin-right: 25px;
  padding: 10px;
  width: 350px;
  border-radius: 10px;
  background-color: #303134;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
  }
  select {
    width: 80px;
    margin-bottom: 5px;
  }
`;

const CutName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  input {
    padding: 3px;
  }
  label {
    margin-right: 15px;
  }
`;

const CutLink = styled.div`
  display: flex;
  margin-bottom: 8px;
  align-items: center;
  input {
    padding: 3px;
  }
  label {
    margin-right: 15px;
  }
`;

const Input = styled.div``;

const Garbage = styled.div<IGarbage>`
  width: 100px;
  height: 100px;
  background-color: ${(props) =>
    props.isDraggingOver ? "#c23616" : "#303134"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.span`
  font-size: 50px;
`;

const Error = styled.span`
  color: red;
  margin-bottom: 5px;
`;

interface ISubmitProps {
  name: string;
  link: string;
}

function AddDelete() {
  const [displayForm, setDisplayForm] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [error, setError] = useState("");
  const [shortCuts, setShortCuts] =
    useRecoilState<ISourtCutState>(shortCutState);
  const onClickDisplayBtn = () => {
    setDisplayForm((current) => !current);
  };
  const onSubmit = ({ name, link }: ISubmitProps) => {
    const keys = Object.keys(shortCuts);
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < shortCuts[keys[i]].length; j++) {
        if (shortCuts[keys[i]][j].name === name) {
          setError("같은 이름의 바로가기가 이미 존재합니다");
          return;
        }
      }
    }
    const key = "Board 1";
    let copyShortCut = [...shortCuts[key]];
    const length = copyShortCut.length;
    copyShortCut.splice(length, 0, { name, link });
    setShortCuts({
      ...shortCuts,
      [key]: copyShortCut,
    });
    localStorage.setItem(
      "shortCuts",
      JSON.stringify({
        ...shortCuts,
        [key]: copyShortCut,
      })
    );
    setError("");
    setValue("name", "");
    setValue("link", "");
    setDisplayForm(false);
  };
  return (
    <Wrapper>
      <Sbutton onClick={onClickDisplayBtn}>바로가기 추가</Sbutton>
      {displayForm ? (
        <AddForm>
          <Error>{error}</Error>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input>
              <CutName>
                <label htmlFor={"name"}>바로가기 이름</label>
                <input
                  id={"name"}
                  {...register("name")}
                  maxLength={30}
                  required
                  autoComplete="off"
                />
              </CutName>
              <CutLink>
                <label htmlFor={"link"}>바로가기 주소</label>
                <input
                  id={"link"}
                  {...register("link")}
                  required
                  autoComplete="off"
                />
              </CutLink>
            </Input>
            <button>추가</button>
          </form>
        </AddForm>
      ) : null}
      <Droppable droppableId="delete">
        {(magic, info) => (
          <Garbage
            isDraggingOver={info.isDraggingOver}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            <Icon>🗑</Icon>
          </Garbage>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default AddDelete;
