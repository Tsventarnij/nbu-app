import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import {getNbuData} from '../actions/dataAction'

class Chart extends Component {


    componentDidMount() {
        const arrDate = this.getArrayDate("YYYYMMDD");
        //console.log("componentDidMount -> arrayDate",arrDate)
        arrDate.forEach(date=>
        {
            this.props.getNbuData("USD", date);
        })

    }
    componentDidUpdate(nextProps){
        //console.log("shouldComponentUpdate","nextProps",nextProps.date, "Props", this.props.date)
        if(nextProps.date!==this.props.date) {

                const arrDate = this.getArrayDate("YYYYMMDD");
                // console.log("in IF",arrDate)
                arrDate.forEach(date => {
                    //console.log("in LUPP", date)
                    let dateExist = false;
                    this.props.data.forEach(item => {
                        if (moment(date, "YYYYMMDD").format("DD.MM.YYYY") === item.exchangedate) {
                            dateExist = true;
                        }
                    })
                    if (!dateExist)
                        this.props.getNbuData("USD", date);
                })
                //return false;
        }
        //return true;

    }

    getArrayDate(format){
        const startDate=moment(this.props.date.startDate, "DD.MM.YYYY");
        const endDate= moment(this.props.date.endDate, "DD.MM.YYYY");
        let contDate=[startDate.format(format)];
        if(endDate.diff(startDate, "years")<2) {
            while (startDate.format("DD.MM.YYYY") !== endDate.format("DD.MM.YYYY")) {

                contDate.push(startDate.add(1, 'day').format(format))
            }
        }else{
            alert("Too long a gap between dates");
        }
        return contDate;
    }

    render() {

        // заполнение массива дат от начальной до конечной
        const arrDate = this.getArrayDate("DD.MM.YYYY");
        //массив данных по курсу
        let cursData=[];

        let propsData =this.props.data
        console.log("this.props.data", propsData)
        let isData=false;
        let oldData=0;
            arrDate.forEach(date => {
                isData=false;
                propsData.some(item => {
                    if (date === item.exchangedate) {
                        cursData.push(item.rate)
                        oldData=item.rate;
                        isData=true;
                    }
                    return date === item.exchangedate;
                })
                if(!isData){
                    cursData.push(oldData)
                }
            })

        //объденяем данные для прорисовки
        const data = {
            labels: arrDate, //this.props.label,
            datasets: [
                {
                    label: 'USD',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 5,
                    data: cursData//[25, 26]//this.props.data
                }
            ]
        };

        return (
            <div>
                <Line  data={data} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    //console.log("State - ", state)
    return {
        date: state.date,
        currency: state.currency,
        data: state.data,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNbuData: (code, date) =>{
            dispatch(getNbuData(code, date));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
// export default Chart
