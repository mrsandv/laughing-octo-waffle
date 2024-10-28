'use client';
import { Loader, Topbar } from 'components/';
import React, { type ReactNode, Suspense } from 'react';
import styles from './layout.module.css';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Topbar />
      {children}
    </div>
  );
}
