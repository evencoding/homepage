import { useForm } from "react-hook-form";
import styled from "styled-components";

const GoogleSearch = styled.div`
  text-align: center;
  padding-top: 8vh;
  margin-bottom: 40px;
`;

const SInput = styled.input`
  width: 60%;
  max-width: 520px;
  min-width: 350px;
  height: 35px;
  border-radius: 20px;
  border: 2px soild whitesmoke;
  background-color: #202124;
  font-size: 16px;
  padding-left: 15px;
  color: white;
  outline: 2px solid #454a52;
  ::placeholder {
    opacity: 0.6;
    color: white;
    margin-left: 15px;
    font-size: 16px;
  }
  &:focus {
    border: none;
    background-color: #303134;
  }
`;

function GoogleForm() {
  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = ({ searchValue }: any) => {
    const url = `https://www.google.com/search?q=${searchValue}`;
    setValue("searchValue", "");
    window.open(url, "_self");
  };
  return (
    <GoogleSearch>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SInput
          {...register("searchValue", { required: true })}
          placeholder="Google Search"
          autoFocus={true}
          autoComplete="off"
        />
      </form>
    </GoogleSearch>
  );
}

export default GoogleForm;
