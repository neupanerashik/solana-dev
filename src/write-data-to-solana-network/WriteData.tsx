"use client";
import { NextPage } from "next";
import React from "react";
import * as web3 from "@solana/web3.js";

const WriteData: NextPage = () => {
  const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "" //pubkey 
  );
  const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
    "" //pubkey
  );

  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const privateKeyBytes = new TextEncoder().encode("asjbdhj");
  const keypair = web3.Keypair.fromSecretKey(privateKeyBytes);
  const publicKey = keypair.publicKey.toBase58();
  console.log("PUBKEY: ", publicKey);

  const sendPingTransaction = async (
    connection: web3.Connection,
    payer: web3.Keypair
  ) => {
    const transaction = new web3.Transaction();
    const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);
    const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

    try {
      const instruction = new web3.TransactionInstruction({
        keys: [
          {
            pubkey: pingProgramDataId,
            isSigner: false,
            isWritable: true,
          },
        ],
        programId,
      });

      transaction.add(instruction);

      const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
      );

      console.log(`✅ Transaction completed! Signature is ${signature}`);
    } catch (e) {
      alert(e);
    }
  };

  const handleClick = async () => {
    sendPingTransaction(connection, keypair);
  };

  return (
    <section className="write-data-container">
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="text-white">{publicKey}</h1>
          <button className="btn btn-warning btn-lg" onClick={handleClick}>
            Send Transaction
          </button>
        </div>
      </div>
    </section>
  );
};

export default WriteData;
