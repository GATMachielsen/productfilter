import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';

import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";
import MediaQuery from 'react-responsive';

const { SubMenu, ItemGroup } = Menu;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  
  

useEffect(() => {
   loadCourses();
    // fetch categories
   loadCategories();
}, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/courses");
    console.log(data, "daasdada courses");
    setCourses(data);
  };

  const loadCategories = async () => {
    const { data } = await axios.get("/api/categories")

    setCategories(data);
    console.log(data, "categpries");
    console.log(categories, "ccategproes")
  }

  const fetchCourses = async (arg) => {
    console.log(arg, "<<------ arguments");
    await axios.post("/api/search/courses", arg)
    .then((c) => {
      console.log(c.data, "cccccc");
      setCourses(c.data)
    });
 
  
    console.log(courses, "courses")
    console.log(courses.name, "course imagegememgegmge");
  };


// handle check for categories
const handleCheck = (e) => {
  

  // console.log(e.target.value);
  let inTheState = [...categoryIds];
  let justChecked = e.target.value;
  let foundInTheState = inTheState.indexOf(justChecked); // index or -1

  // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
  if (foundInTheState === -1) {
    inTheState.push(justChecked);
  } else {
    // if found pull out one item from index
    inTheState.splice(foundInTheState, 1);
  }


  setCategoryIds(inTheState);

  fetchCourses({ categoryIds: inTheState }, {published: true});

};





  return (
    <>
    <MediaQuery minWidth={600}>
    <div className="container-fluid" style={{padding: "0"}}>
          
          <div className="row" style={{padding: "15px", paddingTop: "20px"}}>
          <div className="col-md-3 pt-2">
              <h4 className="text-center" >Zoekfilter</h4>
              <hr />
    
              <Menu defaultOpenKeys={["1", "2"]} mode="inline">
              {/* defaultOpenKeys={["1", "2"]} mode="inline" */}
                <SubMenu
                  key=""
                  title={
                    <span className="h6">
                      Categories
                    </span>
                  }
                >
                  {categories.map((c) => (
                      <div key={c._id}>
                        <Checkbox
                          onChange={handleCheck}
                          className="pb-2 pl-4 pr-4"
                          value={c._id}
                          name="category"
                          checked={categoryIds.includes(c._id)}
                        >
                          {c.name}
                        </Checkbox>
                   
                        <br />
                      </div>
                    ))}
                </SubMenu>
         
      
              </Menu>
            </div>
    
            <div className="col-md-9 pt-2">
              {loading ? (
                <h4 className="text-danger">Loading...</h4>
              ) : (
                <h4 className="text-danger text-center">Online Courses</h4>
              )}
    
              {courses.length < 1 && <p>No courses found</p>}
    
                <div className="row">
                    {courses.map((course) => (
                    <div key={course._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-4">
                        <CourseCard course={course}/>
                    </div>))}
                </div>
            </div>
          </div>
          {/* <Footer /> */}
    
        </div>
    </MediaQuery>
    </>
 
  );
};

export default Courses;
