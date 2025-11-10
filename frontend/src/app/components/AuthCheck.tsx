'use client';

import { useEffect, useState } from 'react';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'yes') {
      // 静态站点直接跳转到 login.html
      window.location.href = 'login.html';
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null; // 未授权时不渲染子组件
  return <>{children}</>;
}