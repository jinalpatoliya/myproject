import React, { Component } from 'react'

export default class ErrorSuccess extends Component {
    render() {
        const { Error, Success }=this.props
        return (
            <div>
                 {
                            Success ? <div className="alert alert-success mt-3" role="alert">
                                {Success}
                            </div> : null
                        }
                        {
                            Error ? <div className="alert alert-danger mt-3" role="alert">
                                {Error}
                            </div> : null
                        }
            </div>
        )
    }
}

