import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { getProduct } from "../admin/helper/adminapicall";
import ImageHelper from "../core/helper/ImageHelper"
import ImageHelperById from "./helper/ImageHelper"
import './style.css'
import axios from 'axios';
import { API } from "../backend";
import abc from "../assets/abc.mp4"


const CourseDetails = ({ match }) => {

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        filePath: "",
    })

    const {
        name,
        description,
        price,
        stock,
        categories,
        filePath,
        category,
        loading,
        formData,
    } = values;

    const imageurl = `http://localhost:8000/api//product/photo/${match.params.productId}`
    const [courseRedirect, setCourseRedirect] = useState(false);

    const preload = (productId) => {
        getProduct(productId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    prodId: data._id,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    filePath: data.filePath,
                    formData: new FormData(),
                });
            }
        });
    };

    const features = () => {
        return (
            <div className="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Shareable Certificate</h5>
                                <p class="card-text">Earn a Certificate upon completion.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"> 100% online</h5>
                                <p class="card-text">Start instantly and learn at your own schedule.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">English</h5>
                                <p class="card-text">ESubtitles: Hindi ,Arabic, French, Ukrainian,  </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"> 100% genuine Certificate</h5>
                                <p class="card-text">Project completion you will get hashed certificate.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }

    /*  const regx = filePath.slice(17)
     console.log(regx)
 
     const abc = "../assets/" + regx
     console.log(abc)
  */

    const contentList = () => {
        return (
            <ol class="list-group list-group-numbered">
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14 </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14</span>

                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start rounded">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold">Subheading</div>
      Cras justo odio
    </div>
                    <span class="badge bg-info p-3 rounded-pill">14</span>
                </li>
            </ol>
        )
    }

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    //console.log(filePath)

    const gotoCourse = () => {
        setCourseRedirect(true);
    }


    const redirectCourse = courseRedirect => {
        if (courseRedirect) {
            return <Redirect to={`/course/video/${match.params.productId}`} />
        }
    }

    const startCourse = () => {
        return (
            (
                <button
                    onClick={gotoCourse}
                    className="btn btn-block btn-outline-info mt-2 mb-2"
                >
                    StartCourse
                </button>
            )
        );
    };

    return (
        <Base title="" description="" fontColor="Yellow"
            className="bg-dark text-black p-4"
        >
            <div className="text-center layoutChanger">
                <div className="col">
                    <h1>{name}</h1>
                    <img src={imageurl} alt="photo" style={{ maxHeight: "100%", maxWidth: "50%" }} className="mb-3 rounded" />
                    <div className="containerStyle">
                        {`${description.substring(0, 2000)}...`}
                    </div>
                </div>

                <div className="container ">
                    <div>
                        {redirectCourse(courseRedirect)}
                        {startCourse()}
                    </div>
                    {features()}
                    {contentList()}
                </div>
                {/* <video style={{ width: '100%' }} controls autoPlay>
                    <source src={abc} type="video/mp4" />
                </video> */}
            </div>
        </Base>
    )
}


export default CourseDetails;


