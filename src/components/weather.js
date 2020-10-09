import React from 'react';

class Weather extends React.Component {
    render() {
        return (
            <div className="container text-light" style={{textAlign: "center"}}>
                <div className="cards pt-4">
                 <h1>{this.props.city}</h1>
                    <h5 className="py-4">
                        {/* change icons depending on weather */}
                        <i className={`wi ${this.props.weatherIcon} display-1`} />
                    </h5>
                    {/* <h1 className="py-2">{this.props.temp_celsius}&deg;</h1> */}

                    {this.props.temp_celsius ? (<h1 className="py-2">{this.props.temp_celsius}&deg;</h1>) : null}

                    {/* show min and max temp */}
                    {minmaxTemp(this.props.temp_min,this.props.temp_max)}

                    <h4 className="py-3">{this.props.description}</h4>
                </div>
            </div>
        
        );
    }
}

const minmaxTemp = (min, max) => {
    if(min && max) {
   return (
   <h3>
       <span className="px-4">{min}&deg;</span>
       <span className="px-4">{max}&deg;</span>
   </h3>
   )
    }
}


export default Weather;