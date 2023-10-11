"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import * as web3 from "@solana/web3.js";

const ReadData: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const addressSubmittedHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior
    try {
      const formData = new FormData(event.currentTarget);
      const enteredAddress = formData.get("address") as string;
      setAddress(enteredAddress); // Update the address state with the entered address
      const key = new web3.PublicKey(enteredAddress);
      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
      const balance = await connection.getBalance(key);
      setBalance(balance / web3.LAMPORTS_PER_SOL);
    } catch {
      setAddress("");
      setBalance(0);
      alert("error");
    }
  };

  return (
    <section className="container">
      <div className="text-white fw-bold my-3 text-center text-2xl">
        Start Solana Journey
      </div>
      <div className="container col-lg-8 mx-auto">
        <form onSubmit={addressSubmittedHandler}>
          <div className="form-container d-flex flex-column align-items-center">
            <input name="address" type="text" className="form-control w-75" />
            <button type="submit" className="btn btn-warning p-2 my-4">
              Check SOL Balance
            </button>
          </div>
        </form>

        <div className="details-container my-5">
          <h5 className="text-center text-light">Address: </h5>
          <h6 className="text-center text-black">{address}</h6>
        </div>
      </div>
      <div className="balance-container text-center text-warning">
        <h2>Balance:</h2>
        <h3>{balance}</h3>
      </div>
    </section>
  );
};

export default ReadData;
