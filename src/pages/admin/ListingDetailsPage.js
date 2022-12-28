import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import FsLightbox from "fslightbox-react";

import * as listingsAPI from "../../utilities/listings-api";
import { deleteListing } from "../../utilities/listings-service";

import EditListingpage from "./EditListingpage";

export default function ListingDetailsPage({ listings }) {
  const [listing, setListing] = useState(); //getting all listings from db

  const [slide, setSlide] = useState(false);//for slide show
  const { id } = useParams();
  const navigation = useNavigate();


  async function getListing() {
    const listing = await listingsAPI.getById(id);
    setListing(listing);
  }

  useEffect(() => {
    getListing();
  }, [setListing]);

  const handleDelete = async (evt) => {
    // evt.preventdefault()
    try {
      navigation("/principal");
      await deleteListing(listing);
    } catch {}
  };

  function loaded() {
    let quals = listing.qualifications.split(".");
    return (
      <>
        <h1 className="title">{listing.title}</h1>

        <div className="main-info">
          <div className="stack-container">
            <div onClick={() => setSlide(!slide)} className="stack">
              <img src={listing.selectedFile1} width="250" height="180" />
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
                src="https://www.google.com/maps/embed?pb=!4v1672167750164!6m8!1m7!1sCAoSLEFGMVFpcE42WkZhcWhydG5waWxKVF9WYmhhUGdQdEg4bkNHTmRPb3FWaExu!2m2!1d39.7746093!2d-84.21754469999999!3f192.34562104242204!4f-14.765138178736677!5f0.4000000000000002"
                width="900"
                height="550"
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>,
              listing.selectedFile2,
              listing.selectedFile3,
              listing.selectedFile4,
              listing.selectedFile5,
              listing.selectedFile7,
              listing.selectedFile9,
            ]}
          />

          <div className="info">
            {listing.available ? (
              <h5 className="available">Available</h5>
            ) : (
              <h3 className="not-available">Not Available</h3>
            )}

            <h3 className="info-title">
              Rent: <span className="price">{listing.rent}</span>
            </h3>
            <h3 className="info-title">
              Security Deposit:{" "}
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
          </div>
        </div>

        <div className="quals">
          <h2>Qualifications:</h2>
          <div>
            {quals.map((pa, idx) => {
              return <p key={idx}>{pa}</p>;
            })}
          </div>
        </div>

        <div className="bottom-buttons">
          <Link to={`/principal/${listing._id}/edit`}>
            <button className="create-btn">Edit</button>
          </Link>

          <form onSubmit={handleDelete}>
            <input className="delete-btn" type="submit"  value="Delete" />
          </form>
        </div>
      </>
    );
  }

  function loading() {
    return (
      <div className="loader">
        <div className="loader-inner">
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
          <div className="loader-line-wrap">
            <div className="loader-line"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {listing ? loaded() : loading()}

      {/* <div className='galery'>
        <img onClick={() => setSlide(!slide)} className='galery-pic1' src = {thisListing.selectedFile1}  />
        <img  onClick={() => setSlide(!slide)}className='galery-pic2' src = {thisListing.selectedFile2}/>
        <img onClick={() => setSlide(!slide)} className='galery-pic3' src = {thisListing.selectedFile3}/>
        <img onClick={() => setSlide(!slide)} className='galery-pic4' src = {thisListing.selectedFile4}/>
        <img onClick={() => setSlide(!slide)} className='galery-pic5' src = {thisListing.selectedFile5}/>
        <img onClick={() => setSlide(!slide)} className='galery-pic6' src = {thisListing.selectedFile7}/>
        <img  onClick={() => setSlide(!slide)} className='galery-pic7' src = {thisListing.selectedFile9}/>
      </div> */}
    </>
  );
}
