import styled from 'styled-components';
import { useState } from 'react';
import GameContainer from './GameContainer';

const MainContainer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [buttonText, setButtonText] = useState('Game Start!');

  const onClickStartButton = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setButtonText('Game Start!');
    } else {
      setButtonText('Retry?');
    }
  };
  return (
    <WrapperDiv>
      <MainContainerDiv>
        <h1>Memory Game</h1>
        {isPlaying && <GameContainer />}
        <StartButton onClick={onClickStartButton}>{buttonText}</StartButton>
      </MainContainerDiv>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainerDiv = styled.div`
  text-align: center;
  margin: 50px;
  color: #454545;
  position: relative;
`;

const StartButton = styled.button`
  font-size: 17px;
  font-weight: bold;
  width: 150px;
  height: 40px;
  border-radius: 1rem;
  margin: 10px;
  cursor: pointer;
  background-color: rgb(71, 77, 83);
  color: white;
  transition: all 0.5s linear;

  :hover {
    transform: scale(1.07);
  }
`;

export default MainContainer;
