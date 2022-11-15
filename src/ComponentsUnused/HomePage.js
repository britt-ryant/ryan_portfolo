import React from 'react';

//import homepage components
import SectionOne from '../Components/Routes/Elements/SectionOne';
import SectionTwo from '../Components/Routes/Elements/SectionTwo';
import SectionThree from '../Components/Routes/Elements/SectionThree';
import SectionFour from '../Components/Routes/Elements/SectionFour';

class HomePage extends React.Component{
    render(){
        return(
            <div className='hoepage-container'>
                <SectionOne />
                <SectionTwo />
                <SectionThree />
                <SectionFour />
            </div>
        )
    }
};


export default HomePage;