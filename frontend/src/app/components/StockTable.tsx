'use client';

import { Stock } from '../types';

interface Props {
  stocks: Stock[];
}

export default function StockTable({ stocks }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">代码</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">名称</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">价格</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">PE</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">PB</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">技术</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">估值</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">新闻</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">总分</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">评级</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">信号</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.map((s) => (
            <tr key={s.code} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-900">{s.code}</td>
              <td className="px-4 py-3 text-sm text-gray-900 font-medium">{s.name}</td>
              <td className="px-4 py-3 text-sm text-gray-900">¥{s.price.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{s.pe.toFixed(1)}</td>
              <td className="px-4 py-3 text-sm text-gray-900">{s.pb.toFixed(1)}</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.technical_score}/2</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.valuation_score}/2</td>
              <td className="px-4 py-3 text-sm text-gray-700">{s.news_score}/2</td>
              <td className="px-4 py-3 text-sm font-semibold text-gray-900">{s.total_score}/6</td>
              <td className="px-4 py-3 text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {s.rating}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-gray-600">
                <div className="flex flex-col gap-1">
                  <span>{s.signals.长线}</span>
                  <span>{s.signals.波段}</span>
                  <span>{s.signals.短线}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}