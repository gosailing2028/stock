'use client';

import { useEffect, useState } from 'react';
import LogoutButton from './components/LogoutButton';
import { StockData } from './types';
import StockTable from './components/StockTable';

export default function HomePage() {
  const [data, setData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      // 页面是静态导出，直接跳到 login.html，避免 /login 404
      window.location.href = 'login.html';
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch('stocks.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('网络错误');
        const json = await res.json();
        setData(json as StockData);
      } catch (err: any) {
        setError(err?.message || '加载失败');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <main className="p-6">加载中...</main>;
  if (error) return <main className="p-6">出错了：{error}</main>;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">储能股票分析</h1>
        <LogoutButton />
      </div>
      {data ? (
        <div>
          <p className="text-sm text-gray-500 mb-2">
            生成时间：{new Date(data.generated_at).toLocaleString()}
          </p>
          <StockTable stocks={data.stocks} />
        </div>
      ) : (
        <p>暂无数据</p>
      )}
    </main>
  );
}
