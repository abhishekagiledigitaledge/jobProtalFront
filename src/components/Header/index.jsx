"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navList } from "@/src/utils/constants";
import NavLink from "./nav-links";
import styles from "./header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={`${styles.header} container-fluid`}>
      <div className={`container ${styles.headerWrap}`}>
        <a href="/" className={styles.logo}>
          Sarakri Govt Jobs
        </a>

        {/* ✅ Toggle Icon for Mobile */}
        <div
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* ✅ Navigation */}
        <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
          <ul>
            {navList.map((item, index) => (
              <li key={index}>
                <NavLink href={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
