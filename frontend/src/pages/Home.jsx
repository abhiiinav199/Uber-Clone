import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPannel from "../components/LocationSearchPannel";
import ConfirmRide from "../components/ConfirmRide";
import VehiclePannel from "../components/VehiclePannel";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import {SocketDataContext} from "../context/SocketContext"
import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useEffect } from "react";

const Home = () => {
  const [data, setdata] = useState({
    pickup: "",
    destination: "",
  });
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [vehiclePannelOpen, setVehiclePannelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [pannelOpen, setpannelOpen] = useState(false);
  const [vehicleType, setvehicleType] = useState(null);

  const [fare, setFare] = useState({});

  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null);
  const vehiclePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const {socket} = useContext(SocketDataContext);
  const {user} = useContext(UserDataContext)

  useEffect(() => {
    if (!user?.user?._id) return; // mandatory line dont delete it

    socket.emit("join", {
      userId: user.user._id ,
      userType: "user",
    });
  }, [user]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/map/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (name === "pickup") {
        setPickupSuggestions(response.data.suggestions);
      } else if (name === "destination") {
        setDestinationSuggestions(response.data.suggestions);
      }
    } catch (error) {
      // handle error
      console.log(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setdata((prev) => ({ ...prev, pickup: suggestion }));
    } else if (activeField === "destination") {
      setdata((prev) => ({ ...prev, destination: suggestion }));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (pannelOpen) {
        gsap.to(pannelRef.current, {
          height: "70%",
          opacity: "1",
          padding: 24,
        });
        gsap.to(pannelCloseRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(pannelRef.current, {
          height: "0%",
          opacity: "0",
          padding: 0,
        });
        gsap.to(pannelCloseRef.current, {
          opacity: "0",
        });
      }
    },
    [pannelOpen]
  );

  useGSAP(() => {
    if (vehiclePannelOpen) {
      gsap.to(vehiclePannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePannelOpen]);

  useGSAP(() => {
    if (confirmRidePannel) {
      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePannelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePannel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  const findTrip = async () => {
    if (data.pickup && data.destination) {
      setVehiclePannelOpen(true);
      setpannelOpen(false);
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: data.pickup,
            destination: data.destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setFare(response.data.fare);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          vehicleType,
          pickup: data.pickup,
          destination: data.destination,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        setwaitingForDriver(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-20 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />

      <div className="h-screen w-screen">
        {/* temporary use image */}
        <img
          className="h-full w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="absolute h-screen flex flex-col justify-end top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={pannelCloseRef}
            onClick={() => setpannelOpen(false)}
            className="absolute cursor-pointer opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-3xl font-semibold">Find a trip</h4>

          <form className="relative py-3" onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-900 rounded-full"></div>

            <input
              name="pickup" //connected with handleChange Function
              value={data.pickup} // connected with state
              onClick={() => {
                setpannelOpen(true);
                setActiveField("pickup");
              }}
              onChange={handleChange}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              name="destination" // connected with handleChange function
              value={data.destination} //connected with state
              onClick={() => {
                setpannelOpen(true);
                setActiveField("destination");
              }}
              onChange={handleChange}
              className="bg-[#eee] px-12
                 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white cursor-pointer py-3 rounded-lg w-full  active:scale-95 transition-all duration-300"
          >
            Find trip
          </button>
        </div>
        <div ref={pannelRef} className="h-0 opacity-0 bg-white ">
          <LocationSearchPannel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setpannelOpen={setpannelOpen}
            setVehiclePannelOpen={setVehiclePannelOpen}
            setPickup={(pickup) => setdata((prev) => ({ ...prev, pickup }))}
            setDestination={(destination) =>
              setdata((prev) => ({ ...prev, destination }))
            }
            activeField={activeField}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>

      <div
        ref={vehiclePannelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePannel
          selectVehicle={setvehicleType}
          fare={fare}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehiclePannelOpen={setVehiclePannelOpen}
        />
      </div>

      <div
        ref={confirmRidePannelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          pickup={data.pickup}
          destination={data.destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePannel={setConfirmRidePannel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3  pt-12"
      >
        <LookingForDriver
          pickup={data.pickup}
          destination={data.destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 pt-12"
      >
        <WaitingForDriver
        
         setwaitingForDriver={setwaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
