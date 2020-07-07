import React, { Component, Fragment } from "react";
import Layout from "../components/Layout/Layout";
import { getMainCategories } from "../actions/maincategory";
import { getCategories } from "../actions/category";
import { insertMainCategoryMapping } from "../actions/maincategorymapping";
import validator from "validator";
import ErrorSuccess from "../components/ErrorSuccess/ErrorSuccess";

export default class MaincategoryMapping extends Component {
  static async getInitialProps() {
    const maincategories = await getMainCategories();
    const categories = await getCategories();
    return {
      maincategories,
      categories,
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      mainCategoryId:'',
      categories: this.props.categories,
      selectedArray: [],
      putRight: [],
      putLeft:[],
      Erroe:'',
      Success:''
    };
  }
  handleMainCategoryId = (e) => {
    this.setState({
      mainCategoryId:e.target.value
    })
  }
  handleselected = (e) => {
    const options = e.target.options;

    const selectedValue = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedValue.push(parseInt(options[i].value));
      }
    }
    console.log(selectedValue);
    console.log(this.props.categories);
    const selectedArray = this.props.categories.filter((item) => {
      const index = selectedValue.indexOf(item.id);
      console.log(index);
      if (index == -1) return false;
      else return true;
    });
    console.log(selectedArray);

    this.setState({ selectedArray: selectedArray });
    console.log("Selected Category Array", this.state.selectedArray);
  };
  handleRight = (e) => {
    e.preventDefault();    
    const categories = this.state.categories;
    let putRight = this.state.putRight.concat(this.state.selectedArray);  
    var arrayFilter = categories.filter((category)=> {
      return !putRight.some((cat)=> {
          return category.id== cat.id;
      });
  });       
    // console.log("arrayFilter",arrayFilter)
    this.setState({
      putRight,
      categories:arrayFilter
    })

    // console.log("selectedArray",selectedArray)
    // console.log("categories",categories)
    // console.log("putRight",putRight)

   
  };
  handleLeft = (e) => {
    e.preventDefault();
    const selectedArray = this.state.selectedArray;
    let categories = this.state.categories;
    categories = categories.concat(selectedArray)
    var arrayFilter = this.state.putRight.filter((category) =>{
      return !selectedArray.some((cat)=> {
          return category.id== cat.id;
      });
  });  
    this.setState({
      categories,
      putRight:arrayFilter
    })
  };

  submitHandle = (e) => {
    e.preventDefault();
    const mainCategoryId=this.state.mainCategoryId;
    const putRight=this.state.putRight;
    let finalArray =[]
    if(!validator.isEmpty(mainCategoryId) &&
        putRight.length>0
    ){
    const myArray = putRight.map((record) => {
      const rec={
        mainCategoryId:parseInt(mainCategoryId),
        categoryId:record.id
      }
      finalArray.push(rec)
      return finalArray
    })
    console.log("Main Array",myArray[0])
    try {
    const data = insertMainCategoryMapping(myArray[0]);
    console.log("insertMainCategoryMapping Data",data)
    if (data) {
      this.setState({
        Success: data.Message,
        Error: "",
        mainCategoryId: "",
        putRight: "",
      });
    }
  } catch (error) {
    this.setState({
      Error: error.data.Message,
      Success: "",
    });
    return;
  }
  }
  else{
    this.setState({
      Error:"Please Select Values."
    })
  }
  }


  render() {
    let { maincategories } = this.props;
    return (
      <Layout>
        <div className="col-md-10 mx-auto">
          <h1 className="text-center">Main Category Mapping</h1>
          <form>
            <div className="form-group">
              <label>Main Category</label>
              <select className="form-control" name="mainCategory" onChange={this.handleMainCategoryId}>
                <option>Please Select Main Category</option>
                {maincategories.map((maincategory) => {
                  return (
                    <option key={maincategory.id} value={maincategory.id}>
                      {maincategory.mainCategoryName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="partition d-flex ">
              <div className="p-2">
                <div className="partition-wrapper">
                  <h3>Category</h3>
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <select
                        multiple
                        className="form-control"
                        id="sel2"
                        name="sellist2"
                        size="15"
                        onChange={this.handleselected}
                      >
                        {this.state.categories.map((category) => {
                          return (
                            <option value={category.id}>
                              {category.categoryName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-1 d-flex button">
                <div>
                  <button
                    className="btn btn-primary mb-3"
                    onClick={this.handleRight}
                  >
                    {">>"}
                  </button>
                  <br />
                  <button className="btn btn-primary" onClick={this.handleLeft}>
                    {"<<"}
                  </button>
                </div>
              </div>
              <div className="p-2">
                <div className="partition-wrapper">
                  <h3>Selected Category</h3>
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <select
                        multiple
                        className="form-control"
                        id="sel2"
                        name="sellist2"
                        size="15"
                        onChange={this.handleselected}
                      >
                        {this.state.putRight &&
                          this.state.putRight.map((category) => {
                            return (
                              <option value={category.id}>
                                {category.categoryName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group text-center">
              <input type="submit" className="btn btn-dark" value="Submit" onClick={this.submitHandle} />
            </div>
            <ErrorSuccess Error={this.state.Error} Success={this.state.Success}/>
          </form>
        </div>
      </Layout>
    );
  }
}
