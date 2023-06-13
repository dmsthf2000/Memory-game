import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { LEVEL_DATA } from '../Constant/levelData';

const Card = ({
  correctArr,
  level,
  setLevel,
  isRetry,
  setIsRetry,
  isTimeOver,
  setTimeOver,
  isEnd,
  setIsEnd,
  setSelectedArr,
  selectedArr,
}) => {
  const [isDone, setIsDone] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [checkRender, setCheckRender] = useState(false);
  const [showSelected, setShowSelected] = useState(false);

  const changeCheckRender = () => {
    setCheckRender(!checkRender);
  };

  const clickCell = (i) => {
    if (!isEnd) {
      setSelectedArr((selectedArr) => {
        return [...selectedArr, i];
      });
    }
  };

  useEffect(() => {
    if (selectedArr.length >= LEVEL_DATA[level].answer) {
      selectedArr.sort();
      correctArr.sort();
      if (JSON.stringify(selectedArr) === JSON.stringify(correctArr)) {
        setIsCorrect(true);
      } else setShowSelected(true);
      setIsDone(true);
    }
  }, [selectedArr]);

  useEffect(() => {
    console.log(showSelected);
    setTimeout(() => {
      setShowSelected(false);
    }, 2500);
  }, [showSelected]);

  useEffect(() => {
    setSelectedArr([]);
    if (isCorrect && isDone) {
      let isEndInstance = false;
      if (level < 3) {
        setLevel((level) => level + 1);
      } else if (level === 3) {
        setIsEnd(true);
        isEndInstance = true;
      }
      setIsDone(false);
      setIsCorrect(false);
      if (!isEndInstance) changeCheckRender();
    }
    if (!isCorrect && isDone) {
      setIsRetry(true);
      setIsDone(false);
    }
  }, [isCorrect, isDone]);

  useEffect(() => {
    if (isRetry) {
      setTimeOver(false);
      setTimeout(() => {
        setFailCount((failCount) => failCount + 1);
        setIsRetry(false);
        changeCheckRender();
      }, 2500);
    }

    if (!isRetry && isTimeOver) {
      setTimeout(() => {
        setTimeOver(false);
        setFailCount((failCount) => failCount + 1);
        changeCheckRender();
      }, 2500);
    }
  }, [isRetry, isTimeOver]);

  const rendering = () => {
    const result = [];
    for (let i = 0; i < LEVEL_DATA[level].card; i += 1) {
      result.push(
        <CellDiv
          key={`${i} ${checkRender}`}
          $key={i}
          $isRetry={isRetry}
          $selectedArr={selectedArr}
          $correctArr={correctArr}
          $showSelected={showSelected}
          className={correctArr.includes(i) ? 'correctBlink' : ''}
          onClick={() => clickCell(i)}
        ></CellDiv>
      );
    }
    return result;
  };
  return (
    <>
      <FailCountDiv>실패 횟수 {failCount}</FailCountDiv>
      {!isEnd && isTimeOver && <TryAgainDiv>TimeOver!</TryAgainDiv>}
      {isEnd && <GameClearDiv>Game Clear!</GameClearDiv>}
      {isRetry && <TryAgainDiv>Try Again!</TryAgainDiv>}
      {
        <TableRowDiv $size={Math.sqrt(LEVEL_DATA[level].card)}>
          {rendering()}
        </TableRowDiv>
      }
    </>
  );
};

const FailCountDiv = styled.div`
  font-weight: bold;
  text-align: end;
  font-size: 15px;
`;

const GameClearDiv = styled.div`
  font-weight: bold;
  border-radius: 10px;
  width: 100%;
  line-height: 70px;
  height: 70px;
  text-align: center;
  font-size: 50px;
  position: absolute;
  top: 45%;
`;

const TryAgainDiv = styled.div`
  font-weight: bold;
  border-radius: 10px;
  width: 100%;
  line-height: 70px;
  height: 70px;
  text-align: center;
  font-size: 50px;
  position: absolute;
  top: 45%;
  animation: 2s forwards hideIn;

  @keyframes hideIn {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const TableRowDiv = styled.div`
  width: ${(props) => props.$size * 110}px;
  margin: 5px;
  overflow: auto;
`;

const CellDiv = styled.div`
  background-color: rgba(79, 146, 231, 0.75);
  border-radius: 10px;
  color: white;
  margin: 5px;
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 30px;
  float: left;
  cursor: pointer;

  ${(props) =>
    props.$showSelected &&
    props.$correctArr.includes(props.$key) &&
    'background-color: #ffba46; transition: background-color  1s ease-in-out'};
  ${(props) => props.$isRetry && 'animation-delay: 2s;'}

  &:active {
    background-color: rgba(4, 28, 58, 0.75);
  }

  &.correctBlink {
    animation: correctBlink 0.3s 0.5s;
  }

  @keyframes correctBlink {
    0% {
      background-color: rgba(79, 146, 231, 0.75);
    }
    20% {
      background-color: #ffba46;
    }
    80% {
      background-color: #ffba46;
    }
    100% {
      background-color: rgba(79, 146, 231, 0.75);
    }
  }

  @keyframes selectBlink {
    0% {
      background-color: rgba(79, 146, 231, 0.75);
    }
    20% {
      background-color: rgba(4, 28, 58, 0.75);
    }
    80% {
      background-color: rgba(4, 28, 58, 0.75);
    }
    100% {
      background-color: rgba(79, 146, 231, 0.75);
    }
  }
`;

export default Card;
