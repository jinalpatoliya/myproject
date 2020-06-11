import React, { Component } from 'react';

class Subcategory extends Component {
    render() {
        const { label, name, handlename, data } = this.props;
        return (
            <div className="form-group">
                <label>{label} :</label>
                <select name={name} onChange={handlename} className="form-control">
                    <option>Please Select Sub Category</option>
                    {
                        data.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.subcategoryName} </option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Subcategory;