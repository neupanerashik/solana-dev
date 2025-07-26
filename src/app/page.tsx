import WalletConnect from "@/interact-with-wallets/WalletContextProvider";
import ReadData from "@/read-data-from-solana-network/ReadData";
import WriteData from "@/write-data-to-solana-network/WriteData";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { AppBar } from "@/components/AppBar";
import { PingButton } from "@/components/PingButton";
import WalletContextProvider from "@/interact-with-wallets/WalletContextProvider";

export default function Home() {
  return (
    <main className="">
      {/* <ReadData /> */}
      {/* <WriteData/> */}
      <div className={styles.App}>
        <WalletContextProvider>
          <AppBar />
          <div className={styles.AppBody}>
            <PingButton />
          </div>
        </WalletContextProvider>
      </div>
    </main>
  );
}
