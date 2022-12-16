import React, { useEffect } from 'react';
import styles from './styles.module.css';

import {useSelector} from 'react-redux';

//import Dnd components
import AccountInfo from './ProfileComponents/AccountInfo';
import UserStats from './Admin/UserStats';
import WeatherComponent from './WeatherComponent';
import NewUserChart from './Admin/NewUserChart';
import TableManager from './Admin/TableManager';
import MessageComponent from './ProfileComponents/MessageComponent';

import {
    Box, Grid,
} from '@mui/material'



const TestDnd = (props) => {
    const admin = useSelector(state => state.admin);
    const weather = useSelector(state => state.weather);
    const form = useSelector(state => state.form);
    const [compList, setCompList] = React.useState(
                                                    [
                                                        {
                                                            key: 1,
                                                            src: <AccountInfo />,
                                                            size: "xsm",
                                                            render: true
                                                        },
                                                        {
                                                            key: 2,
                                                            src: <WeatherComponent />,
                                                            size: "sm",
                                                            render: weather.renderWeatherData
                                                        }, 
                                                        {
                                                            key: 3,
                                                            src: <MessageComponent />,
                                                            size: "lg",
                                                            render: form.renderList
                                                        }
                                                        ])
    const dragItem = React.useRef();
    const dragOverItem = React.useRef();

    useEffect(() => {
        console.log(props);
        if(props.admin){
            setCompList([
                ...compList,
                {
                    key: 4,
                    src: <UserStats />,
                    size: "xsm",
                    render: admin.renderTotalUserCount
                },      
                {
                    key: 5,
                    src: <NewUserChart />,
                    size: "lg",
                    render: admin.renderChart
                }, 
                {
                    key: 6,
                    src: <TableManager />,
                    size: "lg",
                    render: admin.renderTable
                },
            ])
        }
    }, []);

    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e) => {
        const copyComponents = [...compList];
        const dragItemContent = copyComponents[dragItem.current];
        copyComponents.splice(dragItem.current, 1);
        copyComponents.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setCompList(copyComponents)
    }

    const paperSize = (itemSize) => {
         switch(itemSize){
            case "xsm":
                return 3
            case "sm":
                return 4;
            case "lg":
                return 8;
            default:
                return 5
         }
    }
 
    return(

        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
            {
            compList &&
            compList.map((item, index) => {
                switch(item.key){
                    case 2:
                        if(weather.renderWeatherData){
                            return(
                                <Grid item xs={5} md={paperSize(item.size)}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                >
                                {item.src}
                                </Grid>
                            )
                        }
                    break;
                    case 3:
                        if(form.renderList){
                            return(
                                <Grid item xs={5} md={paperSize(item.size)}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                >
                                {item.src}
                                </Grid>
                            )
                        }
                    break;
                        
                    case 4:
                        if(admin.renderTotalUserCount){
                            return(
                                <Grid item xs={5} md={paperSize(item.size)}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                >
                                {item.src}
                                </Grid>
                            )
                        }
                    break;
                    case 5:
                        if(admin.renderChart){
                            return(
                                <Grid item xs={5} md={paperSize(item.size)}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                >
                                {item.src}
                                </Grid>
                            )
                        }
                    break;
                    case 6:
                        if(admin.renderTable){
                            return(
                                <Grid item xs={5} md={paperSize(item.size)}
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                >
                                {item.src}
                                </Grid>
                            )
                        }
                    break;
                    default:
                        return(
                            <Grid item xs={5} md={paperSize(item.size)}
                            onDragStart={(e) => dragStart(e, index)}
                            onDragEnter={(e) => dragEnter(e, index)}
                            onDragEnd={drop}
                            key={index}
                            draggable
                            >
                            {item.src}
                            </Grid>
                        )
                }
                }
            )}
            </Grid>
        </Box>
    )
}

export default TestDnd;