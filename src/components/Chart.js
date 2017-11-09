import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import {getNbuData} from '../actions/dataAction'
import styled, { keyframes } from 'styled-components'

class Chart extends Component {

    componentDidMount() {
        // const arrDate = this.getArrayDate("YYYYMMDD");
        // arrDate.forEach(date=>{
        //     this.props.getNbuData("USD", date);
        // })
    }

    componentDidUpdate(nextProps){
      // if(nextProps.date!==this.props.date) {
      //   const arrDate = this.getArrayDate("YYYYMMDD");
      //   arrDate.forEach(date => {
      //     this.props.selected.forEach(currenc=>{
      //         let dateExist = false;
      //
      //         this.props.data.forEach(item => {
      //           if (moment(date, "YYYYMMDD").format("DD.MM.YYYY") === item.exchangedate && currenc.label === item.cc) {
      //             dateExist = true;
      //           }
      //         })
      //         if (!dateExist)
      //             this.props.getNbuData(currenc.label, date);
      //       })
      //     })
      //
      //   }
    }

    // getArrayDate(format){
    //     const startDate=moment(this.props.date.startDate, "DD.MM.YYYY");
    //     const endDate= moment(this.props.date.endDate, "DD.MM.YYYY");
    //     let contDate=[startDate.format(format)];
    //     if(endDate.diff(startDate, "years")<2) {
    //         while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {
    //             contDate.push(startDate.add(1, 'day').format(format))
    //         }
    //     }else{
    //         alert("Too long a gap between dates");
    //     }
    //     return contDate;
    // }

    render() {
        // заполнение массива дат от начальной до конечной
        //const arrDate = this.getArrayDate("DD.MM.YYYY");
        //массив данных по курсу
        // let cursData=[];
        // let propsData =this.props.data
        // let isData=false;
        // let oldData=0;

        //
        // this.props.selected.forEach((currenc,index)=>{
        //     isData=false;
        //     this.props.selected[index].data=[];
        //     arrDate.forEach(date => {
        //
        //         propsData.some(item => {
        //           if (date === item.exchangedate&&currenc.label===item.cc) {
        //             this.props.selected[index].data.push(item.rate)
        //             // cursData.push(item.rate)
        //             oldData=item.rate;
        //             isData=true;
        //             return true;
        //           }
        //           return false;
        //         })
        //         if(!isData){
        //             // cursData.push(oldData)
        //             this.props.selected[index].data.push(oldData)
        //         }
        //     })
        //
        // })

        //объденяем данные для прорисовки
        //console.log("selected", this.props.selected)
        const data = {
            labels: this.props.date, //this.props.label,
            datasets: this.props.selected,

        };
        // console.log("Chart")
        // console.log("1props", this.props, "state", this.state)
        return (
            <Wrapper>
                {/*<LoaderEnd src='spinner.gif' />*/}
                {this.props.loading ?  <Loader src='spinner.gif' /> : ''}
                {this.props.loadEnded ?  <LoaderEnd src='spinner.gif' /> : ''}
                <Line  data={data} />
            </Wrapper>
        )
    }
}
// height: 100%;
// left: 50%;
// top: 50%;
// transform: translateX(-50%) translateY(-50%);
// position: absolute;

// function mapStateToProps(state) {
//     return {
//         date: state.date,
//         currency: state.currency,
//         data: state.data,
//         selected: state.selected
//     };
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getNbuData: (code, date) =>{
//             dispatch(getNbuData(code, date));
//         }
//     };
// };
//
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

