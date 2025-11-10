'use client';

import { useEffect, useState } from 'react';
import { StockData } from './types';
import StockTable from './components/StockTable';
import LogoutButton from './components/LogoutButton';

export default function Home() {
  const [data, setData] = useState<StockData>({ generated_at: '', count: 0, results: [] });

  useEffect(() => {
    // 客户端拉取数据
    fetch('/api/stocks', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({ generated_at: '', count: 0, results: [] }));

    // 简单登录态检查
    const auth = localStorage.getItem('auth');
    if (auth !== 'yes') {
      window.location.href = '/login';
    }
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">储能股票分析</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">生成时间：{data.generated_at}</span>
            <LogoutButton />
          </div>
        </div>

        {data.count === 0 ? (
          <div className="text-center py-12 text-gray-600">暂无数据，请先运行 Python 脚本生成 stocks.json</div>
        ) : (
          <StockTable stocks={data.results} />
        )}
      </div>
    </main>
  );
}
