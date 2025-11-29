'use client';

import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // For clean social redirects

import { ICOContext } from "../context/ERC20ICO";
import Style from "../styles/index.module.css";
import zKrypt from "../assets/zKrypt.jpg";

// Social media icons (add these to your public folder or use CDN)
import GitHubIcon from "../assets/github-icon.png"; // 32x32 PNG
import DiscordIcon from "../assets/discord-icon.png";
import TelegramIcon from "../assets/telegram-icon.png";
import XIcon from "../assets/x-twitter-icon.png";

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

            {/* NEW: Social Media Icons Section */}
            <div className={Style.socialIconsContainer}>
              <h3 style={{ margin: "20px 0 10px 0", fontSize: "18px", color: "#333" }}>
                Join the Community
              </h3>
              <div className={Style.socialIcons}>
                {/* GitHub Icon */}
                <Link href="https://github.com/kalabmesfin/zKrypt-FHE-ICO" target="_blank" rel="noopener noreferrer">
                  <div className={Style.socialIconWrapper}>
                    <Image 
                      src={GitHubIcon} 
                      alt="GitHub" 
                      width={32} 
                      height={32}
                      className={`${Style.socialIcon} ${Style.githubIcon}`}
                    />
                    <span className={Style.iconTooltip}>GitHub</span>
                  </div>
                </Link>

                {/* Discord Icon */}
                <Link href="https://discord.gg/phantomexile" target="_blank" rel="noopener noreferrer">
                  <div className={Style.socialIconWrapper}>
                    <Image 
                      src={DiscordIcon} 
                      alt="Discord" 
                      width={32} 
                      height={32}
                      className={`${Style.socialIcon} ${Style.discordIcon}`}
                    />
                    <span className={Style.iconTooltip}>Discord</span>
                  </div>
                </Link>

                {/* Telegram Icon */}
                <Link href="https://t.me/codeforchrist" target="_blank" rel="noopener noreferrer">
                  <div className={Style.socialIconWrapper}>
                    <Image 
                      src={TelegramIcon} 
                      alt="Telegram" 
                      width={32} 
                      height={32}
                      className={`${Style.socialIcon} ${Style.telegramIcon}`}
                    />
                    <span className={Style.iconTooltip}>Telegram</span>
                  </div>
                </Link>

                {/* X (Twitter) Icon */}
                <Link href="https://x.com/zialch" target="_blank" rel="noopener noreferrer">
                  <div className={Style.socialIconWrapper}>
                    <Image 
                      src={XIcon} 
                      alt="X (Twitter)" 
                      width={32} 
                      height={32}
                      className={`${Style.socialIcon} ${Style.xIcon}`}
                    />
                    <span className={Style.iconTooltip}>X</span>
                  </div>
                </Link>
              </div>
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
