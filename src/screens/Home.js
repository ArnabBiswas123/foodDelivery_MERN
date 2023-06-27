import Navbar from "../components/Navbar";
import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer';
import Card from "../components/Card";
export default function Home() {

  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);
  const [search, setsearch] = useState('')

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/foodData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();
    // console.log(response)
    // console.log(response[0],response[1]);
    setfooditem(response[0])
    setfoodcat(response[1])
  }
  useEffect(() => {
    loadData();
  }, [])





  return (
    <>
      <div><Navbar /></div>
      {/* starting of Carausel */}
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" >
        <div className="carousel-inner" id='carousel'>
          <div className='carousel-caption' style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" value={search} onChange={(e) => { setsearch(e.target.value) }} placeholder="Search" aria-label="Search" />
            </div>
          </div>

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/300×300/?burger" className="d-block w-100 card-img-top" style={{ objectFit: "fill !important", width: "100%", hight: "100%" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?pastry" className="d-block w-100 card-img-top" style={{ objectFit: "fill !important", width: "100%", hight: "100%" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/300×300/?cheese" className="d-block w-100 card-img-top" style={{ objectFit: "fill !important", width: "100%", hight: "100%" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      {/* Ending of Carausel */}
      {/* in bootstrap for margin we have m-3 m-4 etc as class name */}
      <div className="container">
        {
          foodcat !== [] ? foodcat.map((data) => {
            return (<div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filteredItems => {
                return (
                  <div key={filteredItems._id} className="col-12 col-md-6 col-lg-3">
                    {/* here we are using bootstrap grid layout */}
                    <Card foodItem={filteredItems}
                      options={filteredItems.options[0]}>
                      </Card>
                  </div>
                )
              }) : <div>No Such Data</div>}

            </div>
            )
          }) : <div>"""</div>
        }
      </div>
      <div><Footer /></div>

    </>
  )
}
