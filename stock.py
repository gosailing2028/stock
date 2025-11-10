import time
import random
from datetime import datetime
import os
import json

class SimpleStockAnalyzer:
    """
    简化版股票分析系统 - 使用模拟数据
    """
    
    def __init__(self):
        self.stock_pool = [
            '300750', '300274', '300014', '688599', '300438', '688063',
            '300124', '002837', '300490', '688248', '300693', '300712'
        ]  # 储能股票池
        self.stock_names = {
            '300750': '宁德时代', '300274': '阳光电源', '300014': '亿纬锂能', 
            '688599': '天合光能', '300438': '鹏辉能源', '688063': '派能科技',
            '300124': '汇川技术', '002837': '英维克', '300490': '华自科技', 
            '688248': '南网科技', '300693': '盛弘股份', '300712': '永福股份'
        }
    
    def analyze_stock(self, stock_code):
        """分析单只股票"""
        print(f"\n🔍 正在分析 {stock_code}...")
        
        # 生成模拟数据
        name = self.stock_names.get(stock_code, f'股票{stock_code}')
        price = round(random.uniform(50, 200), 2)
        pe = round(random.uniform(15, 40), 2)
        pb = round(random.uniform(1.5, 5.0), 2)
        
        # 生成模拟评分
        technical_score = random.randint(0, 2)
        valuation_score = random.randint(0, 2)
        news_score = random.randint(0, 2)
        total_score = technical_score + valuation_score + news_score
        
        # 生成评级
        if total_score >= 5:
            rating = "🟢 三重共振"
        elif total_score >= 3:
            rating = "🟡 双重共振"
        elif total_score >= 1:
            rating = "🟠 单一共振"
        else:
            rating = "🔴 不符合条件"
        
        # 生成交易信号
        signals = {
            '长线': "🟢 适合布局" if total_score >= 4 else "🔴 暂不参与",
            '波段': "🟢 符合条件" if total_score >= 3 else "🔴 不符合",
            '短线': "🟢 强势启动" if total_score >= 5 else "🔴 等待时机"
        }
        
        if signals['波段'] == "🟢 符合条件":
            signals['波段止损'] = f"{price * 0.92:.2f}"
            signals['波段目标'] = f"{price * 1.15:.2f}"
            
        if signals['短线'] == "🟢 强势启动":
            signals['短线止损'] = f"{price * 0.95:.2f}"
        
        # 返回分析结果
        return {
            'code': stock_code,
            'name': name,
            'price': price,
            'pe': pe,
            'pb': pb,
            'technical_score': technical_score,
            'valuation_score': valuation_score,
            'news_score': news_score,
            'total_score': total_score,
            'rating': rating,
            'signals': signals
        }
    
    def scan_stock_pool(self):
        """扫描整个股票池"""
        print("🚀 开始扫描enery股票池...")
        results = []
        
        for stock_code in self.stock_pool:
            try:
                result = self.analyze_stock(stock_code)
                results.append(result)
                
                # 显示简要结果
                print(f"{result['code']} {result['name']:6} | 评分: {result['total_score']}/6 | 评级: {result['rating']} | 价格: {result['price']:.2f}")
                
                # 避免输出过快
                time.sleep(0.2)
                
            except Exception as e:
                print(f"分析{stock_code}时出错: {e}")
                continue
        
        # 按评分排序
        results.sort(key=lambda x: x['total_score'], reverse=True)
        return results
    
    def generate_recommendation_report(self, results):
        """生成投资建议报告"""
        print("\n" + "="*80)
        print("📊 「系统1」投资建议报告")
        print("="*80)
        
        # 显示推荐股票
        print("\n🏆 推荐股票 (评分≥4):")
        print("-"*80)
        for stock in results:
            if stock['total_score'] >= 4:
                print(f"⭐ {stock['code']} {stock['name']:6} | 评分: {stock['total_score']}/6")
                print(f"   技术: {stock['technical_score']}/2 | 估值: {stock['valuation_score']}/2 | 新闻: {stock['news_score']}/2")
                print(f"   价格: {stock['price']:.2f} | PE: {stock['pe']:.1f} | PB: {stock['pb']:.1f}")
                print(f"   信号: {stock['signals']}")
                print()
        
        # 显示详细分析
        print("\n📈 详细分析结果:")
        print("-"*80)
        for stock in results[:3]:  # 显示前3只股票
            print(f"\n{stock['code']} {stock['name']} 详细分析:")
            print(f"综合评分: {stock['total_score']}/6 - {stock['rating']}")
            print(f"技术面: {stock['technical_score']}/2, 估值面: {stock['valuation_score']}/2, 新闻面: {stock['news_score']}/2")
            print(f"PE: {stock['pe']:.1f}, PB: {stock['pb']:.1f}, 价格: {stock['price']:.2f}")
            print("交易信号:", stock['signals'])
    
    def export_results_to_json(self, results, output_path=None):
        """将分析结果导出为 JSON 文件，默认写入脚本同级的 data/stocks.json"""
        base_dir = os.path.dirname(__file__)
        if output_path is None:
            output_path = os.path.join(base_dir, 'data', 'stocks.json')
        # 确保目录存在
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        payload = {
            'generated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'count': len(results),
            'results': results,
        }
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)
        print(f"\n💾 JSON 数据已写入: {output_path}")

# 主程序
if __name__ == "__main__":
    # 初始化模型
    model = SimpleStockAnalyzer()
    
    # 扫描股票池
    results = model.scan_stock_pool()
    
    # 生成投资报告
    model.generate_recommendation_report(results)
    # 将结果导出为 JSON，供前端使用
    model.export_results_to_json(results)
