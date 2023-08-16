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

//Styles
import styles from "../styles/components.module.scss";

const SideBar = () => {
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
      <Link href={page.link} key={index}>
        <div className={styles.navLink}>
          <div className='flex flex-col justify-center'>{page.icon}</div>{" "}
          <div className='ml-4 flex flex-col justify-center'>{page.title}</div>
        </div>
      </Link>
    ));
  };

  return (
    <main
      className='bg-primary-color'
      style={{
        width: "240px",
      }}
    >
      <div
        className='flex flex-col justify-center align-middle border-b border-b-zinc-600'
        style={{
          height: "114px",
        }}
      >
        <div className='flex justify-center font-bold'>
          <Image src={LogoIcon} alt='Logo' />{" "}
          <p className='text-base ml-3 text-accent-color leading-10'>LOREM</p>
        </div>
      </div>
      <div
        style={{
          marginTop: "60px",
        }}
      >
        {mapNavigationLinks()}
      </div>
    </main>
  );
};

export default SideBar;
