import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LEVEL_DATA } from '../Constant/levelData';

const Timer = ({ setTimeOver, isTimeOver, level, isRetry, isEnd }) => {
  const allTime = LEVEL_DATA[level].time;
  const [time, setTime] = useState(allTime); // 남은 시간 (단위: 초)
  useEffect(() => {
    if (!isRetry && !isEnd && !isTimeOver) {
      if (time > 0) {
        const timer = setInterval(() => {
          setTime((prev) => Math.round((prev - 0.1) * 10) / 10);
        }, 100);

        return () => clearInterval(timer);
      }
    }
    return undefined;
  }, [time, level]);

  useEffect(() => {
    if (!isRetry && !isTimeOver) setTime(allTime);
  }, [level, isRetry, isTimeOver]);

  useEffect(() => {
    if (time === 0) {
      setTimeOver(true);
    }
  }, [setTimeOver, time]);

  return (
    <TimerContainerDiv>
      <TimerImgDiv />
      <TimeProgressDiv $progressTime={time} $allTime={allTime} />
    </TimerContainerDiv>
  );
};

const TimerImgDiv = styled.div`
  background-image: url(../../public/stopwatch.png);
  width: 20%;
  float: left;
  height: 15px;
`;

const TimerContainerDiv = styled.div`
  width: 100%;
  height: 15px;
  background-color: #ced4da;
  border-radius: 10px;
`;

const TimeProgressDiv = styled.div`
  width: ${(props) => (props.$progressTime / props.$allTime) * 100}%;
  transition: width 100ms;
  height: 15px;
  background-color: #5361b7;
  border-radius: 10px;
`;

export default Timer;
