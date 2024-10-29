'use client';
import { Topbar } from 'components/';
import React, { type ReactNode } from 'react';
import styles from './layout.module.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Topbar />
      {children}
    </div>
  );
}
