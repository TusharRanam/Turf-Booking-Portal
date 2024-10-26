import GroundCard from "../components/GroundCard";
import Navbar from '../components/Navbar'
import "../custom.css";
import axios from "axios";
import { BASE_URL } from "../utils/helper";
import Call from '../images/Call.png';
import Soccer from '../images/Soccer.png';
import Round from '../images/Round.png';
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger plugin
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import turf from '../assets/turf.mp4';


// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {

  const [grounds, setGrounds] = useState([]);

  const getAllGrounds = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/user/grounds`);
      console.log("data is", data);
      if (data.success) {
        setGrounds(data.grounds);
      }
      console.log(grounds);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllGrounds();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById('groundContainer');
    const cardWidth = 350;
    const totalWidth = grounds.length * cardWidth;
    const maxScroll = totalWidth - container.offsetWidth;

    if (direction === 'left') {
      setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0));
    } else if (direction === 'right') {
      setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll));
    }
  };

  useEffect(() => {
    gsap.to("#nav", {
      backgroundColor: "#000",
      duration: 0.5,
      height: "100px",
      scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        start: "top -10%",
        end: "top -11%",
        scrub: 1,
      },
    });

    gsap.to("#main", {
      backgroundColor: " #FFFFE0",
      scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top -25%",
        end: "top -70%",
        scrub: 2,
      },
    });

  }, []);

  return (
    <>
      <Navbar />
      <video autoPlay loop muted preload="metadata"><source autoPlay src={turf} type="video/mp4" />
      </video>
      <div id="main">
        <div id="page1">
          <h1>EAT. DRINK. PLAY.</h1>
          <h2>WELCOME TO TURF's CORNER!</h2>
          <p>
            Turf's Corner is a sportsground and outdoor playground booking portal
            that provides easy booking facility. Enabling players to easily book a
            turf playground online - anytime, anywhere.
          </p>
        </div>
        <div className="w-full border-t-4 border-pink-600"></div>
        <div id="page2">
          <div id="scroller">
            <div id="scroller-in">
              <h4>CRICKET</h4>
              <h4>FOOTBALL</h4>
              <h4>BASKETBALL</h4>
              <h4>BADMINTON</h4>
              <h4>LEAGUES</h4>
            </div>
            <div id="scroller-in">
              <h4>CRICKET</h4>
              <h4>FOOTBALL</h4>
              <h4>BASKETBALL</h4>
              <h4>BADMINTON</h4>
              <h4>LEAGUES</h4>
            </div>
          </div>

          <div className="w-full border-t-4 border-pink-600"></div>
          <div className="">
            <section id="whyTurfZone" className="content-center w-full">
              <div className="w-4/5 mx-auto">
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full px-4">
                    <div className="text-center mx-auto mb-12 lg:mb-20 max-w-[510px]">

                      <h2 className="pt-20 text-5xl text-black font-extrabold text-center"> Why <span className="text-pink-600">Turf's Corner</span>
                      </h2>
                      <p className=" pt-10 text-black text-xl">
                        Turf's corner is a sportsground and outdoor playground booking portal that provides easy
                        booking facility for schools, clubs and other sports organizations across various Turf.
                        Enabling them to easily book a turf playground online - anytime.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap pb">
                  <div className="w-full md:w-1/2 lg:w-1/3 px-6">
                    <div className=" w-[70px] h-[70px] flex items-center justify-items-center bg-primary rounded-2xl mb-8">
                      <img className=" items-center" src={Call} alt="Call" />
                    </div>
                    <p className=" text-black">
                      No more calling around and being on hold for long periods of time.
                    </p>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                    <div className='w-[70px] h-[70px] flex items-center justify-center bg-primary rounded-2xl mb-8'>
                      <img src={Round} alt="Round" />
                    </div>
                    <p className='text-black'>
                      Book a turf in advance.
                    </p>
                  </div>

                  <div className="w-full md:w-1/2 lg:w-1/3 px-4 ">
                    <div className='w-[70px] h-[70px] flex  items-center justify-center bg-primary rounded-2xl mb-8'>
                      <img src={Soccer} alt="Soccer-field" />
                    </div>
                    <p className='text-black'>
                      Finding a football pitch is much easier.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            <section>
              <div className="w-full">
                <h2 className="pt-24 text-5xl font-extrabold text-center text-pink-600">
                  Featured <span className="text-black">Playgrounds</span>
                </h2>
                <div className="pt-20 w-4/5 mx-auto grid gap-8 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 align-center">{grounds?.map((ground) =>
                  <div key={ground?._id} className="mr-5">
                    <GroundCard
                      id={ground?._id}
                      name={ground?.ground_name}
                      location={ground.location}
                      price={ground.price}
                      image={ground?.images[0]}
                    />
                  </div>
                )}</div>
              </div>
            </section>

            <section>
              <div id="about-us" >
                <div id="about-us-in">
                  <h3 className="text-black text-5xl">ABOUT US</h3>
                  <p className="text-black">
                    Turf's Corner is an app where you
                    can book grounds to play
                    football and cricket with your friends and loved ones.
                    Book a ground near you today!
                  </p>
                </div>
              </div>
            </section>


          </div>
        </div>
      </div>

    </>
  );
};

export default Landing;
