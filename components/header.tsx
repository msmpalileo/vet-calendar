'use client'

import Image from "next/image";
import { useContext } from 'react';
import { usePathname } from 'next/navigation'

//Styles
import styles from "@/styles/components.module.scss";

//Assets
import SearchIcon from "@/assets/images/header/search.svg"
import UserIcon from "@/assets/images/header/sample_user.png"
import ChevronDownIcon from "@/assets/images/header/chevron-down.svg"
import BellIcon from "@/assets/images/header/bell"
import SettingsIcon from "@/assets/images/header/settings"
import LogoutIcon from "@/assets/images/header/logout"

//Context
import { AppointmentsContext } from "@/app/utils/context/appointmentsContext";

const Header = () => {
  const {
    searchValue,
    setSearchValue,
  } = useContext(AppointmentsContext);
  const path = usePathname();

  return (
    <header className={styles.header}>
        <div className="grow mr-10 flex relative">
          {path === "/appointments" && (
            <>
              <input 
                type="text" 
                placeholder="Search" 
                className={styles.searchBar} 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Image
                src={SearchIcon}
                alt='Search'
                height={20}
                width={20}
                className={styles.searchIcon}
              />
            </>
          )}
        </div>
        <button className={styles.user}>
          <Image
            src={UserIcon}
            alt='User'
            height={36}
            width={36}
          />
          <span>Jane Dee</span>
          <Image
            src={ChevronDownIcon}
            alt='Chevron Down'
            height={20}
            width={20}
          />
        </button>
        <button className={styles.iconButton}>
          <BellIcon />
        </button>
        <button className={styles.iconButton}>
          <SettingsIcon />
        </button>
        <button className={styles.iconButton}>
          <LogoutIcon />
        </button>
    </header>
  )
}

export default Header