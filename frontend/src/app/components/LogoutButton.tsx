'use client';

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem('auth');
    // 静态站点直接跳转到 login.html，避免 /login 404
    window.location.href = 'login.html';
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      退出
    </button>
  );
}