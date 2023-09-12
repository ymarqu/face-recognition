import React, { Component } from "react";

class Rank extends Component{

    render(){
        const {name, rank} = this.props;
        return(
            <div>
                <div className="white f3">
                    {`${name}, your current rank is...`}
                </div>
                <div className="white f2">
                    {`${rank}`}
                </div>
            </div>
        )

    }
}

export default Rank;
