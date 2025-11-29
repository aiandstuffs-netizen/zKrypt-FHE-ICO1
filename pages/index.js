'use client';

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { ICOContext } from "../context/ERC20ICO";
import Style from "../styles/index.module.css";
import zKrypt from "../assets/zKrypt.jpg";

// Social media icons (place in public/assets/icons/)
import GitHubIcon from "../assets/github-icon.png";
import DiscordIcon from "../assets/discord-icon.png";
import TelegramIcon from "../assets/telegram-icon.png";
import XIcon from "../assets/x-icon.png";

import NavBar from "../components/NavBar/NavBar";
import User from "../components/User/User";
import Transfer from "../components/Transfer/Transfer";
import Onboarding from "../components/Onboarding/onboarding";
import FaucetApp from "../components/Faucet/FaucetApp";

const REDIRECT_THRESHOLD_DISPLAY = 100; 

const Home = () => {
  const {
    account,
    NoOfToken,
    TokenName,
    TokenStandard,
    TokenSymbol,
    TokenOwnerBal,
    holderArray,
    transferToken,
    accountBallanc, 
    completed,
    disconnectWallet,
  } = useContext(ICOContext);

  // Simplified Loading Check & Disconnected State
  if (account === undefined || completed) {
    return (
      <div
        className={Style.home}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>{account === undefined ? "Loading wallet connection..." : "Loading account data..."}</p>
      </div>
    );
  }

  // Show Onboarding if account is null (disconnected)
  if (account === null) {
    return <Onboarding />;
  }

  // Faucet redirect logic: Show Faucet if balance < 100 ZKT
  const isBalanceInsufficient = parseFloat(accountBallanc) < REDIRECT_THRESHOLD_DISPLAY;

  if (isBalanceInsufficient) {
    return (
      <FaucetApp
        key={account}
        account={account}
        onClaimComplete={() => window.location.reload()} 
        disconnectWallet={disconnectWallet}
      />
    );
  }

  // MAIN APP RENDER (Balance >= 100 ZKT)
  return (
    <>
      <NavBar />
      <div className={Style.home}>
        <div className={Style.heroSection}>
          <div className={Style.heroSection_left}>
            <h1>SECURE YOUR FUTURE IN DEFI WITH zKrypt</h1>
            <p>
              The first ICO powered by Zama's Fully Homomorphic Encryption (FHE). Invest and transact with absolute data privacy,
              ensuring your computations remain confidential on-chain.
            </p>

            <div className={Style.heroSection_left_btn}>
              <button className={Style.btn}>Whitepaper</button>
              <button className={Style.btn}>Product Intro</button>
            </div>

            {/* PROFESSIONAL SIDE-BY-SIDE SOCIAL ICONS - NO WRAPPING */}
            <div className={Style.socialIconsPro}>
              <Link href="https://github.com/kalabmesfin/zKrypt-FHE-ICO" target="_blank" rel="noopener noreferrer" className={Style.socialLink}>
                <div className={`${Style.socialBtn} ${Style.github}`}>
                  <Image src={GitHubIcon} alt="GitHub" width={24} height={24} />
                </div>
              </Link>

              <Link href="https://discord.gg/phantomexile" target="_blank" rel="noopener noreferrer" className={Style.socialLink}>
                <div className={`${Style.socialBtn} ${Style.discord}`}>
                  <Image src={DiscordIcon} alt="Discord" width={24} height={24} />
                </div>
              </Link>

              <Link href="https://t.me/codeforchrist" target="_blank" rel="noopener noreferrer" className={Style.socialLink}>
                <div className={`${Style.socialBtn} ${Style.telegram}`}>
                  <Image src={TelegramIcon} alt="Telegram" width={24} height={24} />
                </div>
              </Link>

              <Link href="https://x.com/zialch" target="_blank" rel="noopener noreferrer" className={Style.socialLink}>
                <div className={`${Style.socialBtn} ${Style.x}`}>
                  <Image src={XIcon} alt="X" width={24} height={24} />
                </div>
              </Link>
            </div>
          </div>

          <div className={Style.heroSection_right}>
            <Image src={zKrypt} alt="banner" width={300} height={300} className={Style.heroSection_right_img_one} />
            <Image src={zKrypt} alt="banner" width={200} height={200} className={Style.heroSection_right_img} />
            <Image src={zKrypt} alt="banner" width={100} height={100} className={Style.heroSection_right_img} />
            <Image src={zKrypt} alt="banner" width={50} height={50} className={Style.heroSection_right_img} />
            <Image src={zKrypt} alt="banner" width={20} height={20} className={Style.heroSection_right_img} />
          </div>
        </div>

        <Transfer
          NoOfToken={NoOfToken}
          TokenName={TokenName}
          TokenStandard={TokenStandard}
          TokenSymbol={TokenSymbol}
          TokenOwnerBal={TokenOwnerBal}
          transferToken={transferToken}
        />
        <User holderArray={holderArray} />
      </div>
    </>
  );
};

export default Home;
