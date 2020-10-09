import React from 'react';
import './city.css';

class City extends React.Component {
    render() {
        return (
            <div className="container">
                <div>{this.props.error ? error() : null}</div>
               <form onSubmit={this.props.loadweather}>
               <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City" />
                    </div>
                    <div className="col-md-3">
                    <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country" />
                    </div>
                    <div className="col-md-3 mt-md-0 text-md-left">
                        <button className="btn">Get weather</button>
                    </div>
                </div>
               </form>
            </div>
        );
    }
};

function error() {
    return (
    <div className="alert" role="alert">
        Enter your City and Country !
    </div>
    );
};



export default City;