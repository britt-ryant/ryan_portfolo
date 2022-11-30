import React, { useEffect } from 'react';

//import redux components
import {connect, useDispatch, useSelector} from 'react-redux';

//import MUI components
import {
        Paper,
        Typography
} from '@mui/material';

//import react-chartjs
import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import { DialerSipSharp } from '@mui/icons-material';
import { getUsersOverTimeAsync } from '../../../redux/adminSlice';



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const tempData = (noOfPoints) => {
    let xVal = 1, yVal = 100;
    let points = [];
    for(let i=0; i<noOfPoints; i++){
        yVal = yVal + Math.round(5 + Math.random() * (-5-5));
        points.push({x: xVal, y: yVal});
        xVal++
    }
    return points
}



 const NewUserChart = (props) => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin )

    React.useEffect(() => {
        if(admin.loading){
            dispatch(getUsersOverTimeAsync())
        }
        //launchFunction()
    }, [admin.loading]);

    const launchFunction = () => {
        admin.userOverTimeData.map((item) => {
            if(item.date !== null){
                console.log(item);

            }
        })
    }

    const data = {
        labels: admin.userOverTimeData.map((item) => {
            if(item.date !== null){
                const newDate = new Date(item.date.slice(0, -1))
                const formattedDate = newDate.toString().slice(3, 15)
                return formattedDate
            }}), 
        datasets: [
            {
                fill: true,
                label: `Number of Users`,
                data: admin.userOverTimeData.map((item) => {
                    if(item.date !== null){
                        return item.cumulative_total
                    }}),
                borderColor: `rgb(53, 162, 235)`,
                backgroundColor: `rgba(53, 162, 235, 0.5)`
            }
        ]
    }
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: false,
                text: `Users Joined`
            },
        },
    }
    
    return (
        <div>
            <Paper sx={{p:2, marginBottom: 4, boxShadow: 20}}>
            <Typography    
                        noWrap
                       component="h3" 
                       sx={{
                           p: 1,
                           paddingBottom:0,
                           textAlign: 'Center'
                       }}
                       variant="h5" 
                       color="primary" 
                       gutterBottom
            >Users</Typography>
            {!admin.loading ? <Line options={options} data={data} /> : <Typography>Loading Data</Typography>}
            </Paper>
        </div>
    )
}

export default NewUserChart;