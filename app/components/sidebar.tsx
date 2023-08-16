"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

//Assets
import LogoIcon from "../assets/images/logo.svg";
import HomeIcon from "../assets/images/navigation/home";
import AppointmentsIcon from "../assets/images/navigation/appointments";
import MessagesIcon from "../assets/images/navigation/messages";
import ContactsIcon from "../assets/images/navigation/contacts";
import DataIcon from "../assets/images/navigation/data";
import SubscriptionIcon from "../assets/images/navigation/subscription";
import HelpIcon from "../assets/images/navigation/help";
import SettingsIcon from "../assets/images/navigation/settings";
import DoubleChevronIcon from "../assets/images/navigation/double-chevron.svg";

//Styles
import styles from "../styles/components.module.scss";

const SideBar = () => {
  const [isMini, setIsMini] = useState(false);

  const pages = [
    {
      title: "Home",
      link: "/",
      icon: <HomeIcon />,
    },
    {
      title: "Appointments",
      link: "/appointments",
      icon: <AppointmentsIcon />,
    },
    {
      title: "Messages",
      link: "/messages",
      icon: <MessagesIcon />,
    },
    {
      title: "Contacts",
      link: "/contacts",
      icon: <ContactsIcon />,
    },
    {
      title: "Data Analytics",
      link: "/data-analytics",
      icon: <DataIcon />,
    },
    {
      title: "Subscription",
      link: "/subscription",
      icon: <SubscriptionIcon />,
    },
    {
      title: "Help Center",
      link: "/help-center",
      icon: <HelpIcon />,
    },
    {
      title: "Settings",
      link: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  const mapNavigationLinks = () => {
    return pages.map((page, index) => (
      <Link href={page.link} key={index} className={styles.navLinkWrapper}>
        <div className={styles.navLink}>
          <div className='flex flex-col justify-center'>{page.icon}</div>{" "}
          <div
            className={`ml-4 flex flex-col justify-center whitespace-pre overflow-hidden ${
              isMini ? "opacity-0" : ""
            }`}
          >
            {page.title}
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <main
      className='bg-primary-color flex flex-col transition-all duration-200 ease-linear'
      style={{
        width: isMini ? "120px" : "240px",
      }}
    >
      <div
        className='flex flex-col justify-center align-middle border-b border-b-secondarborder-t-light-gray'
        style={{
          height: "114px",
        }}
      >
        <div
          className='flex transition-all duration-200 ease-linear'
          style={{
            paddingLeft: isMini ? "42px" : "65px",
          }}
        >
          <Image src={LogoIcon} alt='Logo' />{" "}
          <p
            className={`text-base ml-3 text-accent-color leading-10 transition-all duration-200 ease-linear ${
              isMini ? "opacity-0" : ""
            }`}
          >
            LOREM
          </p>
        </div>
      </div>
      <button
        className={`${styles.buttonMinimize} ${
          isMini ? styles.buttonIsMinized : ""
        }`}
        onClick={() => setIsMini(!isMini)}
      >
        <Image src={DoubleChevronIcon} alt='Minimize' />
      </button>
      <div
        style={{
          marginTop: "60px",
        }}
      >
        {mapNavigationLinks()}
      </div>
      <div className='mt-auto'>
        <hr
          className={`mx-auto border-t border-t-light-gray ${
            isMini ? "w-100" : "w-11/12"
          }`}
        />
        <div className='py-10 flex flex-col justify-center align-middle text-center'>
          <Image
            src={LogoIcon}
            alt='Logo'
            height={20}
            width={20}
            className='mx-auto'
          />
          <p className='text-light-gray text-xs mt-3'>&copy; Lorem 2023</p>
        </div>
      </div>
    </main>
  );
};

export default SideBar;
