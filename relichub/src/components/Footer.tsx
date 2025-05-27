export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">古玩珍藏</h3>
            <p className="text-sm mt-1">珍贵古玩，尽在掌握</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm hover:underline">
              关于我们
            </a>
            <a href="#" className="text-sm hover:underline">
              联系方式
            </a>
            <a href="#" className="text-sm hover:underline">
              隐私政策
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-amber-700 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} 古玩珍藏. 保留所有权利.
        </div>
      </div>
    </footer>
  );
}
