import React from 'react';

//import redux components
import { connect } from 'react-redux';
import { getMessagesByUserAsync } from '../../../redux/formSlice';

//import mui components
import {
    Button,
    Paper,
    Typography,
    Divider,
    Stack,
    Table,
    TableRow,
    TableHead,
    TableCell,
    TableBody
} from '@mui/material';



const stateToProps = (state) => {
    return state
}


class MessageComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            startIndex: 0,
            cutOff: 5,
            hideButton: true
        }
        this.addMoreMessages = this.addMoreMessages.bind(this);
        this.hideMessages = this.hideMessages.bind(this);
    }
    componentDidMount(){
        const { dispatch } = this.props;
        let email = this.props.user.userInfo.email;
        dispatch(getMessagesByUserAsync(email))
        .then((data) => {
            console.log(`calling dispatch`);
            if(data.payload.error){
                this.setState({
                    loading: false,
                    error: data.payload.error,
                })
                return data.payload
            } else {
                this.setState({
                    loading: false,
                    messages: data.payload,
                    hideButton: false
                })
                return data.payload
            }
        }).then((data) => {
            if(!data.error){
                if(this.state.messages){
                    let renderList = this.state.messages.slice(this.state.startIndex, this.state.cutOff);
                    return this.setState({
                                renderMessages: renderList,
                            });
                  } else {
                      console.log(`messages loading.....`);
                  }
            }
        })
    }

    addMoreMessages(){
        if(this.state.renderMessages){
            let nextFiveStart = this.state.startIndex += 5;
            let nextFiveCutOff = this.state.cutOff += 5;
            let array = this.state.renderMessages;
            if(nextFiveCutOff <= this.state.messages.length){
                this.changeRenderList(nextFiveStart, nextFiveCutOff, array);
            } else {
                this.changeRenderList(nextFiveStart, this.state.messages.length, array);
                this.setState({hideButton: true})
            }
        }
    }

    changeRenderList(firstFive, lastFive, array){
        this.setState({
            startIndex: firstFive,
            cutOff: lastFive
        })
        let addingRenderList = this.state.messages.slice(firstFive, lastFive);
        addingRenderList.forEach((message) => {
            array.push(message);
        })
        this.setState({renderMessages: array});
    }

    hideMessages(){
        this.setState({
            cutOff: 5,
            startIndex: 0,
            renderMessages: this.state.messages.slice(0, 5),
            hideButton: false
        })
    }
    render(){
        return(
            <Paper 
                sx={{
                    marginTop: 2,
                    width: '90vw',
                    maxHeight: '50vh',
                    minHeight: '10vh',
                    overflow: 'auto',
                    flexDirection: 'column',
                    display: 'flex',
                    textAlign: 'left',
                    boxShadow: 20,
                    p:2

                }}>
                <Typography 
                    component="h2" 
                    sx={{
                        fontSize: 30,                        
                        paddingBottom: 0,

                        }}
                    varitant="h6" 
                    color="primary" 
                    gutterBottom
                    >
                        Recent Messages Sent:
                </Typography>
                <Divider />
                <Table size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell>Time Sent</TableCell>
                            <TableCell>Date Sent</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!this.state.loading && !this.state.error && this.state.renderMessages? this.state.renderMessages.map((message) => {
                            const newDate = new Date(message.timestamp.slice(0, -1));
                            const date = newDate.toString().slice(0, 15);
                            const time = newDate.toLocaleTimeString();
                            return(
                                <TableRow key={message.id}>
                                    <TableCell sx={{width: 150}}>{time}</TableCell>
                                    <TableCell sx={{width: 200}}>{date}</TableCell>
                                    <TableCell>{message.message}</TableCell>
                                </TableRow>
                            )
                        }): null}
                        {this.state.loading ? 
                        <TableRow>
                            <TableCell colSpan={3}>
                            Loading...
                            </TableCell>
                        </TableRow> 
                            : null}
                        {!this.state.loading && this.state.error ? 
                            <TableRow>
                                <TableCell colSpan={3}>
                                {this.state.error}
                                </TableCell>
                            </TableRow> 
                            : null}
                    </TableBody>
                </Table>
                {!this.state.hideButton ? <Button varitant="text" sx={{justifyContent: 'left', paddingTop:2}} onClick={this.addMoreMessages}>
                    See More
                </Button> : null}
                {this.state.hideButton && !this.state.error? <Button variant='text'sx={{justifyContent: 'left', paddingTop:2}} onClick={this.hideMessages}>Hide</Button> : null}
            </Paper>
        )
    }
};

export default connect(stateToProps)(MessageComponent);
