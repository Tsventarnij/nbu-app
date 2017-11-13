import React from 'react';
import {Line} from 'react-chartjs-2';
import styled, { keyframes } from 'styled-components'

const Chart = (props) => {
    const data = {
        labels: props.date,
        datasets: props.selected,
    };

    return (
        <Wrapper>
            {props.loading ?  <Loader src='spinner.gif' /> : ''}
            {props.loadEnded ?  <LoaderEnd src='spinner.gif' /> : ''}
            <Line  data={data} />
        </Wrapper>
    );
}
// export default connect(mapStateToProps, mapDispatchToProps)(Chart)
export default Chart

const Wrapper = styled.div`
    position: relative;
`;

const Loader = styled.img`
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    position: absolute;
    display: block;
`;

const hideLoader = keyframes`
  0% { 
    opacity: 100;
    display: block;
  }
  99%{
    height: 100%;
  }
  100% { 
    height: 0%;
    opacity: 0;
    display: none;
  }
`;

const LoaderEnd = styled(Loader)`
  animation: ${hideLoader} 1s 0s forwards;
`;

