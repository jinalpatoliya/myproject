import React, { Component } from 'react';

class Subcategory extends Component {
    render() {
        const { label, name, handlename, data , selectedValue } = this.props;
        return (
            <div className="form-group">
                <label>{label} :</label>
                <select name={name} onChange={handlename} className="form-control"  value={selectedValue}>
                    <option>Please Select Sub Category</option>
                    {
                        data.map((subcategory) => {
                            return (
                                <option key={subcategory.id} value={subcategory.id}>{subcategory.subcategoryName} </option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Subcategory;