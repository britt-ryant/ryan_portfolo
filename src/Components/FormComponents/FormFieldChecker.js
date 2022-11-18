import React from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';

//import Dev Components
import DevForm from '../../DevComponents/DevForm';


const stateToProps = (state) => {
    return state;
}

class FormFieldChecker extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            repeatFieldData: {
                first: '',
                last: '',
                email: '',
            },
            uniqueFieldData: {
                message: '',
                password: '',
                confirmPassword: ''
            },
            fieldError: {
                first: [false, "First Name"],
                last: [false, "Last Name"],
                email: [false, "Email"],
                message: [false, "Message"],
                password: [false, "Password"],
                confirmPassword: [false, "Confirm Password"]
            },
            emailForm: this.props.emailForm,
            logInForm: this.props.logInForm,
            signUpForm: this.props.signUpForm,
            editAccountForm: this.props.editAccountForm,
            checked: true,
        };
        this.handleFieldCheck = this.handleFieldCheck.bind(this);
        this.setFormData = this.setFormData.bind(this);
        this.setError = this.setError.bind(this);
        this.checkForBlanks = this.checkForBlanks.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.redirect = this.redirect.bind(this);
    };


    redirect(event){
        this.setState({
            logInForm: false,
            signUpForm: true
        });
        
    };

    setError(errorInfo, error) {
        if(errorInfo !== "checkbox"){
            let title = this.state.fieldError[errorInfo][1];
            this.setState((prevState) => ({
                fieldError: {
                    ...prevState.fieldError,
                   [errorInfo]: [error, title] 
                }
            }))
        }
    };

    setFormData(event) {
        const {name, value} = event.target; 
        if(name.toString() === "message" || name.toString() === "password" || name.toString() === "confirmPassword"){
            this.setState((prevState) => ({
                uniqueFieldData: {
                    ...prevState.uniqueFieldData,
                    [name] : value.trim()
                }
            }))
        } else {
            this.setState(prevState => ({
                repeatFieldData: {
                    ...prevState.repeatFieldData,
                    [name] : value
                }
            }))
        }
    };
    handleFieldCheck(event){
        event.preventDefault();
        let formData = {
            ...this.state.repeatFieldData,
            ...this.state.uniqueFieldData
        }
        
        let trimmedFormData = {}
        for(let [key, value] of Object.entries(formData)){
            let newVal = value.trim();
            trimmedFormData[key] = newVal;
        }
        switch(true){
            case this.state.emailForm:
                delete trimmedFormData.password;
                delete trimmedFormData.confirmPassword;
                this.checkForBlanks(trimmedFormData, event);
            break;
            case this.state.logInForm:
                delete trimmedFormData.message;
                delete trimmedFormData.first;
                delete trimmedFormData.last;
                delete trimmedFormData.confirmPassword;
                this.checkForBlanks(trimmedFormData, event);
            break;
            case this.state.signUpForm || this.state.editAccountForm:
                delete trimmedFormData.message;
                this.checkForBlanks(trimmedFormData, event);
            break;
            default: 
                console.log('404: no form type selected!')
        } 
    };

    checkForBlanks(formData, event){
        for(let field of event.target){
            if(field.value && field.name !== "" ){
                formData[field.name] = field.value
            }
        }
            for(const [key, value] of Object.entries(formData)){
                switch(true) {
                    case value === "" && key !== "email":
                        this.setError(key, true);
                        this.fireToast(key);
                    break;
                    case key === "email":
                        this.checkEmialField(key, value, event);
                    break;
                    default:
                        this.setError(key, false);
                    }
                }
            if('password' in formData && Object.values(formData).every(entry => entry !== "")){
                this.passwordValidation(formData.password, event, formData);
            } else{
                this.finalValidation(event, formData);
            }
            
    };

    passwordValidation(password, event, formData){
        switch(true){
            case this.state.logInForm:
                this.props.dbStorage(event, this.state.checked, formData);
            break;
            case this.state.signUpForm || this.state.editAccountForm:
                let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
                if(pattern.test(password)){
                    if(formData.confirmPassword === formData.password){
                        this.props.dbStorage(event, this.state.checked, formData)
                    } else {
                        toast.error("Passwords do not match, please make sure they are the same!");
                        this.setError("confirmPassword", true);
                    }
                } else {
                    toast.error(`Password must include at least one uppercase, one lowercase, and one special character!`);
                    this.setError("password", true);
                };
            break;
            default:
                console.log("Error in password validation switch");

        }

    }

    finalValidation(event, formData){
        console.log('infinal');
        if(Object.values(formData).every(entry => entry !== "") && event.currentTarget.email.checkValidity()){
            //this.devEmail(event);
            this.successRouter(event)
            this.props.dbStorage(event, this.state.checked, formData);
            //commented out during DEV MAKE SURE TO RECONNECT EMAILJS!!!!
            //this.state.emailForm ? this.props.sendEmail(event, formData) : console.log("SOMETHING ELSE WAS REDIRECTED TO WRONG FUNCTION");
        }
    };

    fireToDb(event){
        this.props.dbStorage(event, this.state.checked);
    }

    checkEmialField(key, value, event){
        if( value === "" || !event.currentTarget.email.checkValidity()){
            this.setError(key, true);
            this.fireToast(key)
        } else {
            this.setError(key, false)
        }
    };

    fireToast(key){
        toast.error(`Please make sure ${this.state.fieldError[key][1]} field is filled out correctly!`);
    };

    successRouter(event){
        console.log("Success");
    }

    handleCheckbox(event) {
        event.target.checked ? this.setState({checked: true}) : this.setState({checked: false});
    };



    render() {

        return (
            <div className='field-checker'>
                <DevForm
                        handleCreateAccountRender={this.props.handleCreateAccountRender}
                        handleLogInRenderClick={this.props.handleLogInRenderClick}
                        redirect={this.redirect}
                        handleCheckbox={this.handleCheckbox}
                        setFormData={this.setFormData} 
                        handleFieldCheck={this.handleFieldCheck}
                        {...this.state}
                    />
            </div>
        )
    }
};


export default connect(stateToProps)(FormFieldChecker);