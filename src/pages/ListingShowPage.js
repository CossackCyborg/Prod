import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import FsLightbox from "fslightbox-react";

import * as listingsAPI from "../utilities/listings-api";
import loading from "../components/loading";


import Footer from "../components/Footer";




export default function ListingShowPage() {
  const [listing, setListing] = useState(); //getting needed listing from db

  const [slide, setSlide] = useState(false);
  const { id } = useParams();
 


  async function getListing() {
    const listing = await listingsAPI.getById(id);
    setListing(listing);
  }

  useEffect(() => {
    getListing();
  }, []);

  
  function loaded() {
    let quals = listing.qualifications.split(".")
    quals.pop()
    return (
      <>
        <div className="return">
          <div className="back">
            <Link to="/available">
              <h2 className="arrow left title">
                <i></i> Back{" "}
              </h2>
            </Link>
          </div>

          <h1 data-aos="zoom-in" data-aos-duration="900" className="title">
            {listing.title}
          </h1>
        </div>

        <div
          data-aos="fade-left"
          data-aos-delay="100"
          data-aos-duration="900"
          className="main-info"
        >
          <div className="stack-container">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="1200"
              onClick={() => setSlide(!slide)}
              className="stack"
            >
              <img src={listing.selectedFile1} width="250" height="180" alt="Salem Crown Apartment Interior"/>
              <span>
                Click to See All Photos and <br />
                Virtual Tour
              </span>
            </div>
          </div>

          <FsLightbox
            toggler={slide}
            sources={[
              listing.selectedFile1,
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1718836309858!6m8!1m7!1sCAoSLEFGMVFpcE42WkZhcWhydG5waWxKVF9WYmhhUGdQdEg4bkNHTmRPb3FWaExu!2m2!1d39.7746093!2d-84.21754469999999!3f244.38685630399706!4f-14.393705879204362!5f0.4000000000000002" 
                width="900"
                height="550"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title = "galery show"
              ></iframe>,
              listing.selectedFile2,
              listing.selectedFile3,
              listing.selectedFile4,
              listing.selectedFile5,
              listing.selectedFile6,
              listing.selectedFile7,
              listing.selectedFile8,
              "https://i.imgur.com/CwSBvsh.jpg", //floor plan
            ]}
          />

          <div className="info info-box">
            <h3 className="info-title">
              Rent: <span className="price">{listing.rent}</span>
            </h3>
            <h3 className="info-title">
              Security Deposit:
              <span className="price">{listing.securityDeposit} </span>
            </h3>

            <p>
              <span className="info-title sub-title">Utilities: </span>
              <span>{listing.utilities}</span>
            </p>

            <p>{listing.description1}</p>
            <p>{listing.description2}</p>

            <p>
              <span className="info-title sub-title">Pets: </span>
              {listing.pets}
            </p>
            <div className="bottom-buttons">
              <a href="sms:937-985-0069?&body=Hello! I'm interested in Salem Crown Apartments">
                <button className="create-btn">
                  <i className="fa fa-comments" aria-hidden="true"></i>
                  &nbsp; Text Us
                </button>
              </a>

              <a
                href="mailto:salemcrownapts@gmail.com?subject=eMail from Salem Crown Web Site&body=Hello! I'm interested in Salem Crown Apartments"
                target="_blank"
                rel="noreferrer"
              >
                <button className="create-btn">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  &nbsp; Email Us
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="quals info-box">
          <h2>Qualifications:</h2>
          <div data-aos="fade-up" data-aos-duration="200">
            <ul className="quals-list">

            {quals.map((pa, idx) => {
                if (pa.includes("evictions") || pa.includes("Evictions") || pa.includes("evictions".toUpperCase())){
                  return <li key={idx}><strong>{pa}</strong></li>;
                }else{
                  return <li key={idx}>{pa}</li>;
                }
            })}
            </ul>
            <a
              href="https://day.managebuilding.com/Resident/rental-application/new/apply"
              target="_blank"
              rel="noreferrer"
            >
              <button className="create-btn">
                <i className="fa fa-pencil" aria-hidden="true"></i>
                &nbsp; Apply Now
              </button>
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {listing ? loaded() : loading()}
      <br/>
      <br/>
      <Footer/>
    </>
  );
}
