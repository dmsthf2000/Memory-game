import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Card from './Card';
import Timer from './Timer';
import { LEVEL_DATA } from '../Constant/levelData';

const GameContainer = () => {
  const [isTimeOver, setTimeOver] = useState(false);
  const [level, setLevel] = useState(0);
  const [correctArr, setCorrectArr] = useState([]);
  const [isRetry, setIsRetry] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedArr, setSelectedArr] = useState([]);

  const selectIndex = (totalIndex, selectingNumber) => {
    const randomIndexArray = [];
    for (let i = 0; i < selectingNumber; i += 1) {
      const randomNum = Math.floor(Math.random() * totalIndex);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i -= 1;
      }
    }
    return randomIndexArray;
  };

  useEffect(() => {
    if (!isRetry && !isTimeOver) {
      setSelectedArr([]);
      setCorrectArr(
        selectIndex(LEVEL_DATA[level].card, LEVEL_DATA[level].answer)
      );
    }
  }, [level, isRetry, isTimeOver]);

  return (
    <GameContainerDiv>
      <LevelDiv>Lv.{level + 1}</LevelDiv>
      <Card
        correctArr={correctArr}
        level={level}
        setLevel={setLevel}
        isRetry={isRetry}
        setIsRetry={setIsRetry}
        isTimeOver={isTimeOver}
        isEnd={isEnd}
        setIsEnd={setIsEnd}
        setTimeOver={setTimeOver}
        selectedArr={selectedArr}
        setSelectedArr={setSelectedArr}
      />
      <Timer
        setTimeOver={setTimeOver}
        level={level}
        isRetry={isRetry}
        isTimeOver={isTimeOver}
        isEnd={isEnd}
      />
    </GameContainerDiv>
  );
};

const LevelDiv = styled.div`
  font-weight: bold;
  text-align: end;
  font-size: 20px;
`;

const GameContainerDiv = styled.div`
  text-align: center;
  position: relative;
`;

export default GameContainer;
