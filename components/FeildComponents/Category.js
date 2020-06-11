import React, { Component } from 'react';

class Category extends Component {
    render() {
        const { label, name, handlename, data } = this.props;
        return (
            <div className="form-group">
                <label>{label} :</label>
                <select name={name} onChange={handlename} className="form-control">
                    <option>Please Select Category</option>
                    {
                        data.map((category) => {
                            return (
                                <option key={category.id} value={category.id}>{category.categoryName} </option>
                            )
                        })
                    }
                </select>
            </div>
        );
    }
}

export default Category;