import React from 'react';

//import redux components
import { connect, useDispatch } from 'react-redux';
import { getAllMessagesAsync, getMessagesByUserAsync, renderReducer } from '../../../redux/formSlice';
import {PURGE} from 'redux-persist';

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
    TableBody,
    withStyles
        } from '@mui/material';

//import components
import FormDialog from '../../FormComponents/FormDialog';
import toast from 'react-hot-toast';



const stateToProps = (state) => {
    return state
}


class MessageComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props,
            loading: true,
            startIndex: 0,
            cutOff: 5,
            hideButton: true
        }
        this.addMoreMessages = this.addMoreMessages.bind(this);
        this.hideMessages = this.hideMessages.bind(this);
        this.handleFormClose = this.handleFormClose.bind(this);
        //this.purgeState = this.purgeState.bind(this);
    }
    componentDidMount(){
        // if(this.state.messages){
        //     return
        // } 
        const { dispatch } = this.props;
        let email = this.props.user.userInfo.email;
        let query = null;
        if(this.props.user.admin){
              this.dataHandling(dispatch(getAllMessagesAsync()))
             
        } else {
             this.dataHandling(dispatch(getMessagesByUserAsync(email)))
        }
    };

    dataHandling(query){
        query.then((data) => {
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
        })
    }

    //*********************PURGE STATEMENT FOR REDUX STATE DEV ONLY *************************/
    // purgeState(e){
    //         e.preventDefault();
    //         const {dispatch} = this.props;
    //         dispatch({
    //                 type: PURGE,
    //                 key: 'root',
    //                 result: () => null
    //             })
            
    //         }
    //*********************PURGE STATEMENT FOR REDUX STATE DEV ONLY *************************/


    componentDidUpdate(prevProps, prevState){
       if(prevProps.form.data !== this.props.form.data){
            console.log(this.state);
            if(this.state.renderMessages){
                if(this.state.startIndex === 0 && this.state.cutOff === 5){
                    let oldMessages = this.state.renderMessages.filter((value, i) => i !== 4);
                    this.setState({
                        renderMessages: [
                            this.props.form.data,
                            ...oldMessages
                        ],
                        hideButton: false,
                        messages: [
                            this.props.form.data,
                            ...this.state.messages
                        ]
                    })
                } else {
                    this.setState({
                        renderMessages: [
                            this.props.form.data,
                            ...this.state.renderMessages
                        ],
                        hideButton: false,
                        messages: [
                            this.props.form.data,
                            ...this.state.messages
                        ]
                    })
                }
            } else {
                console.log("rendering the first message");
                this.setState({
                    renderMessages: [this.props.form.data],
                    messages: [this.props.form.data],
                    error: false
                })
            }
        }
        if(this.state.messages !== prevState.messages){
            if(!this.state.error){
                if(this.state.messages){
                    let renderList = this.state.messages.slice(this.state.startIndex, this.state.cutOff);
                    return this.setState({
                                renderMessages: renderList,
                            });
                  } else {
                      console.log(`messages loading.....`);
                  }
            }
        }
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
    };

    handleFormClose(){
        const {dispatch} = this.props;
        dispatch(renderReducer());
    }

    renderItems(message){
        switch(message.length){
            case 1: 
            const newDate = new Date(message[0].timestamp.slice(0, -1));
            const date = newDate.toString().slice(0, 15);
            const time = newDate.toLocaleTimeString();
            return(
                <React.Fragment>
                    <TableRow key={45}>
                        <TableCell sx={{width: 150}}>{time}</TableCell>
                        <TableCell sx={{width: 200}}>{date}</TableCell>
                            {this.props.user.admin ? <TableCell>{message[0].first}</TableCell> : null}
                            {this.props.user.admin ? <TableCell>{message[0].last}</TableCell> : null}
                            {this.props.user.admin ? <TableCell>{message[0].email}</TableCell> : null}
                       <TableCell>{message[0].message}</TableCell>
                    </TableRow>
                </React.Fragment>
            )
            default:
                return message.map((item, key) => {
                    const newDate = new Date(item.timestamp.slice(0, -1));
                    const date = newDate.toString().slice(0, 15);
                    const time = newDate.toLocaleTimeString();
                    return(
                        <React.Fragment>
                            <TableRow key={item.id} >
                                <TableCell sx={{width: 150}}>{time}</TableCell>
                                <TableCell sx={{width: 200}}>{date}</TableCell>
                                {this.props.user.admin ? <TableCell>{item.first}</TableCell> : null}
                                {this.props.user.admin ? <TableCell>{item.last}</TableCell> : null}
                                {this.props.user.admin ? <TableCell>{item.email}</TableCell> : null}
                                <TableCell>{item.message}</TableCell>
                            </TableRow>
                        </React.Fragment>
                    )
                })
        }
    }
    render(){
        return(
            <Paper 
                sx={{
                        p: 2,
                        border: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        boxShadow: 20

                }}>
                <Typography 
                       noWrap
                       component="h3" 
                       sx={{
                           p: 1,
                           paddingBottom:0,
                           textAlign: 'left'
                       }}
                       variant="h5" 
                       color="primary" 
                       gutterBottom
                    >
                        Recent Messages Sent:
                </Typography>
                <Divider />
                <Table size="small">
                    {/* {this.renderTemplate()} */}
                    <TableHead>
                        <TableRow >
                            <TableCell>Time Sent</TableCell>
                            <TableCell>Date Sent</TableCell>
                            {this.state.user.admin ? <TableCell>First Name</TableCell> : null}
                            {this.state.user.admin ? <TableCell>Last Name</TableCell> : null}
                            {this.state.user.admin ? <TableCell>Email Address</TableCell> : null}
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!this.state.loading && !this.state.error && this.state.renderMessages ? this.renderItems(this.state.renderMessages) : null}
                        {this.state.loading ? 
                        <TableRow key={46}>
                            <TableCell colSpan={3}>
                            Loading...
                            </TableCell>
                        </TableRow> 
                            : null}
                        {!this.state.loading && this.state.error ? 
                            <TableRow key={47}>
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
                {/* <Button onClick={this.purgeState}>Purge</Button> */}
                {this.state.hideButton && !this.state.error? 
                <Button variant='text'sx={{justifyContent: 'left', paddingTop:2}} onClick={this.hideMessages}>Hide</Button> : null}
                 {this.props.form.renderForm ? <FormDialog
                                                                        handleFormClose={this.handleFormClose} 
                                                                        successToast={this.props.successToast} 
                                                                         /> : null}
            </Paper>
        )
    }
};

export default connect(stateToProps)(MessageComponent);
