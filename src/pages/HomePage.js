import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import "animate.css";

import * as listingsAPI from "../utilities/listings-api";

export default function HomePage() {
  const [listings, setListings] = useState();
  const [isHovering, setIsHovering] = useState(false);


  async function getListing() {
    const listings = await listingsAPI.getAll();
    setListings(listings);
  }

  useEffect(() => {
    getListing();
  }, []);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const loaded = () => {
    const availableListings = []; //finding available listings

    listings.map((listing) => {
      if (listing.available === true) {
        // console.log(listing)
        return availableListings.push(listing);
      }
    });
    console.log("in loaded");

    console.log(availableListings);

    function MultipleAvailable() {
      console.log("in multiple");

      console.log(availableListings);

      return (
        <div className="add-container">
          <div className="ad">
            <span>
              We have {availableListings.length} available apartments
              <br />
              <Link to="/available">
                {" "}
                <button className="btn-add">See more</button>
              </Link>
            </span>
          </div>

          <div className="directions">
            <div>
              <i className="fa fa-compass" aria-hidden="true"></i>
              <span> Directions:</span>
            </div>
            <a
              href="https://www.google.com/maps/dir//1102+Salem+Ave,+Dayton,+OH+45406/@39.7746572,-84.2196603,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88408122b505a61d:0xc35c5f962acf2cf5!2m2!1d-84.2174716!2d39.7746572"
              target="_blank"
            >
              <span>1102 Salem AveDayton, OH 45406</span>
            </a>
          </div>
        </div>
      );
    }

    function SingleAvailable() {
      //finding available listings

      return (
        <div className="add-container">
          <div className="ad">
            We have {availableListings.length} available apartment
            <br />
            <Link to="/available">
              {" "}
              <button className="btn-add">See more</button>
            </Link>
          </div>

          <div className="directions">
            <div>
              <i className="fa fa-compass" aria-hidden="true"></i>
              <span> Directions:</span>
            </div>
            <a
              href="https://www.google.com/maps/dir//1102+Salem+Ave,+Dayton,+OH+45406/@39.7746572,-84.2196603,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88408122b505a61d:0xc35c5f962acf2cf5!2m2!1d-84.2174716!2d39.7746572"
              target="_blank"
            >
              <span>1102 Salem AveDayton, OH 45406</span>
            </a>
          </div>
        </div>
      );
    }

    return availableListings.length === 1
      ? SingleAvailable()
      : availableListings.length === 0
      ? noneAvailable()
      : MultipleAvailable();
  };

  function noneAvailable() {
    return (
      <div className="single-direction">
        <div>
          <i className="fa fa-compass" aria-hidden="true"></i>
          <span> Directions:</span>
        </div>
        <a
          href="https://www.google.com/maps/dir//1102+Salem+Ave,+Dayton,+OH+45406/@39.7746572,-84.2196603,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x88408122b505a61d:0xc35c5f962acf2cf5!2m2!1d-84.2174716!2d39.7746572"
          target="_blank"
        >
          <span>1102 Salem AveDayton, OH 45406</span>
        </a>
      </div>
    );
  }

  return (
    <div className="homepageContainer">

      {listings ? loaded() : noneAvailable()}

      <div 
           className={isHovering ? 'homePic-faded' : 'homePic'}
           onMouseOver={handleMouseOver}
           onMouseOut={handleMouseOut}>
        <img
          className="animate__zoomIn animate__bounce" src="https://i.imgur.com/T8ueCt2.jpg"/>

        {/* <h3 className="home-pic-text">
          One Bedroom Apartments for Rent in Dayton, OH
        </h3> */}

        <div className="home-pic-text">
          <h1 className="title-main">Salem Crown Apartments</h1>
          <br/>
          <p>
            Fully remodeled One Bedroom Apartments with luxury vinyl plank floors, and newer
            appliances that consist of a stove, fridge and dishwasher.
          </p>

          <Link to="/about">
            <button className="home-btn">See More</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
