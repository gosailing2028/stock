import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  // 读取 Python 生成的 JSON 文件
  const filePath = path.join(process.cwd(), '..', 'data', 'stocks.json');
  try {
    const jsonStr = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonStr);
    return NextResponse.json(data);
  } catch (err) {
    // 如果文件不存在或解析失败，返回空数据
    return NextResponse.json({ generated_at: '', count: 0, results: [] });
  }
}