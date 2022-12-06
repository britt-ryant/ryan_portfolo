import React from 'react';

//import MUI components
import {
    Paper,
    ImageList,
    ImageListItem,
    Box,
    Dialog,
    Typography
} from '@mui/material';


//import tech logos
import amazonBucket from '../../../../images/logos/amazonBuckets.png';
import apacheSpark from '../../../../images/logos/apacheSpark.png';
import aws from '../../../../images/logos/aws.png';
import cSharp from '../../../../images/logos/cSharp.png';
import java from '../../../../images/logos/java.png';
import lambda from '../../../../images/logos/lambda.png';
import mySQL from '../../../../images/logos/mySQL.png';
import nodeJs from '../../../../images/logos/nodeJs.png';
import postgreSQL from '../../../../images/logos/postgreSQL.png';
import python from '../../../../images/logos/python.png';
import ruby from '../../../../images/logos/ruby.png';
import react from '../../../../images/logos/react.png';
import redux from '../../../../images/logos/redux.png';
import github from '../../../../images/logos/github.png';
import javascript from '../../../../images/logos/javascript.png';
import expressJS from '../../../../images/logos/expressJS.png';


class DescriptionDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logo: this.props.comp.img,
            title: this.props.comp.text,
        }
    }
    componentDidMount(){
        this.itemSelector(this.props.comp.text)
    }
    itemSelector(name){
        switch(name){
            case "C#":
                this.setState({description: "C# is a general-purpose, high-level multi-paradigm programming language. C# encompasses static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented, and component-oriented programming disciplines."})
                return
            case "ExpressJS":
                this.setState({description: "Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js."})
                return 
            case "JavaScript":
                this.setState({description: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries."})
                return;
            case "Java":
                this.setState({description: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible."})
                return
            case "Amazon S3":
                this.setState({description: "Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface. Amazon S3 uses the same scalable storage infrastructure that Amazon.com uses to run its e-commerce network."})
                return
            case "AWS Lambda":
                this.setState({description: "AWS Lambda is an event-driven, serverless computing platform provided by Amazon as a part of Amazon Web Services. It is a computing service that runs code in response to events and automatically manages the computing resources required by that code."})
                return;
            case "Rails":
                this.setState({description: "is a server-side web application framework written in Ruby under the MIT License. Rails is a model–view–controller (MVC) framework, providing default structures for a database, a web service, and web pages. "})
                return
            case "Apache Spark":
                this.setState({description: "Apache Spark is an open-source unified analytics engine for large-scale data processing. Spark provides an interface for programming clusters with implicit data parallelism and fault tolerance."})
                return
            case "MySQL":
                this.setState({description: "MySQL is an open-source relational database management system. Its name is a combination of 'My', the name of co-founder Michael Widenius's daughter My, and 'SQL', the abbreviation for Structured Query Language. "})
                return ;
            case "NodeJS":
                this.setState({ description: "Node.js is an open-source server environment. Node.js is cross-platform and runs on Windows, Linux, Unix, and macOS. Node.js is a back-end JavaScript runtime environment. Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser. "})
                return;
            case "PostgreSQL":
                this.setState({description: "PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley."})
                return;
            case "Python":
                this.setState({description: "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming."})
                return;
            case "Ruby":
                this.setState({description: "Ruby is an interpreted, high-level, general-purpose programming language which supports multiple programming paradigms. It was designed with an emphasis on programming productivity and simplicity. In Ruby, everything is an object, including primitive data types."})
                return;
            case "React": 
                this.setState({description: "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies."})
                return;
            case "Redux":
                this.setState({description: "Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces. Similar to Facebook's Flux architecture, it was created by Dan Abramov and Andrew Clark."})
                return;
            case "GitHub":
                this.setState({description: "GitHub, Inc. is an Internet hosting service for software development and version control using Git. It provides the distributed version control of Git plus access control, bug tracking, software feature requests, task management, continuous integration, and wikis for every project. "})
                return;
            default: 
                console.log('logo not found');
        }
    }
    render(){
        return (
            <Dialog
                    open={this.props.comp}
                    onClose={this.props.handleWindowClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth>
                <Paper
                    sx={{
                        justifyContent: "center",
                        textAlign: "center",
                        p: 2,
                        }}
                >
                    <img 
                        className="dialog-logo"
                        src={this.state.logo} 
                        height="100vh" 
                        draggable={false}
                        alt="logo" />
                    <Typography variant="h3">{this.state.title}</Typography>
                    <Typography sx={{width: '80%', display: 'inline-block', p: 2}}>{this.state.description ? this.state.description : "No desc. loaded...." }</Typography>
                    <Typography variant="caption" sx={{display: 'inline-block'}}>Descriptions are from Wikipedia.com</Typography>
                </Paper>
            </Dialog>
        )
    }
}


export default DescriptionDialog;