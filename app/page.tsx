import React from 'react';

const AttendifyLanding: React.FC = () => {
  return (
    // 'dark' class di sini untuk simulasi dark mode. 
    // Dalam produksi, class 'dark' biasanya dipasang di tag <html> atau melalui ThemeProvider.
    <div className="dark">
      <div className="bg-background-light dark:bg-background-dark text-[#111218] dark:text-white transition-colors duration-300 font-sans min-h-screen w-full">
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          
          {/* Top Navigation */}
          <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f1f4] dark:border-b-gray-800 bg-white/90 dark:bg-[#101322]/90 backdrop-blur-md px-10 py-3 transition-colors duration-300">
            <div className="flex items-center gap-4 text-[#111218] dark:text-white">
              <div className="size-8 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_319)">
                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_319"><rect fill="white" height="48" width="48"></rect></clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-[#111218] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Attendify</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="hidden md:flex items-center gap-9">
                <a className="text-[#111218] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors leading-normal" href="#features">Features</a>
                <a className="text-[#111218] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors leading-normal" href="#login">Login</a>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-bold leading-normal tracking-[0.015em] shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200">
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <div className="layout-container flex grow flex-col">
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                <div className="@container">
                  <div className="flex flex-col gap-10 px-4 py-10 md:py-20 @[864px]:flex-row @[864px]:items-center">
                    {/* Left Content */}
                    <div className="flex flex-col gap-8 @[480px]:min-w-[400px] flex-1">
                      <div className="flex flex-col gap-4 text-left">
                        <h1 className="text-[#111218] dark:text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl">
                          Master Your Time,<br/> Hit Your Targets
                        </h1>
                        <h2 className="text-[#616789] dark:text-gray-400 text-lg font-normal leading-relaxed max-w-lg">
                          The minimalist time tracker designed for professionals who value focus. Track hours, set goals, and gain insights without the clutter.
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all duration-200">
                          <span className="truncate">Get Started for Free</span>
                        </button>
                      </div>
                    </div>
                    {/* Right Content (Image) */}
                    <div className="flex-1 w-full max-w-[600px] perspective-1000">
                      <div 
                        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-500 ease-out" 
                        data-alt="Minimalist dashboard interface showing time tracking charts and active timers" 
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZTCzqPhuZvmez0T4saNs8BGhr2JBw8RQxbcmoNm-VXSCjUhkz1q5d5c0eZMWAr0B1BcUPOM8S050Gx1Fnoi7BID-dJte_N-sZ2zMlkFPfcgdSA4vDTBM4qGliBOx43vaZ6iubWA6kFFALAv5dJAdQS1SGHandwC-ilA8EH7ITaj89-7xTHE7BWM0U9hpDlXruZ2tTBUzwv62Q9ENo1G0LkZ7qXEYp5H2PHmkFR_uj9Z5iZm78FspWv1f4JVA57T7Du4DjoXh3Z7Q')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="layout-container flex grow flex-col bg-white dark:bg-[#101322] py-20 transition-colors duration-300" id="features">
            <div className="px-4 md:px-40 flex flex-1 justify-center">
              <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
                <div className="flex flex-col gap-12 @container">
                  <div className="flex flex-col items-center text-center gap-6">
                    <h2 className="text-primary text-sm font-bold uppercase tracking-widest">Features</h2>
                    <h1 className="text-[#111218] dark:text-white tracking-tight text-3xl font-bold leading-tight md:text-5xl max-w-[720px]">
                      Everything you need to stay productive, nothing you don't.
                    </h1>
                    <p className="text-[#616789] dark:text-gray-400 text-lg font-normal leading-normal max-w-[600px]">
                      We stripped away the complexity to give you a tool that actually helps you focus, rather than distracting you.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                    {/* Feature 1 */}
                    <div className="flex flex-1 gap-6 rounded-2xl border border-[#dbdde6] dark:border-gray-800 bg-background-light dark:bg-gray-900 p-8 flex-col hover:border-primary/50 transition-colors duration-300 group">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-[28px]">schedule</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#111218] dark:text-white text-xl font-bold leading-tight">Easy Check-in</h3>
                        <p className="text-[#616789] dark:text-gray-400 text-base font-normal leading-relaxed">
                          Start and stop timers with a single click. No complex forms or nested menus. Just focus and go.
                        </p>
                      </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex flex-1 gap-6 rounded-2xl border border-[#dbdde6] dark:border-gray-800 bg-background-light dark:bg-gray-900 p-8 flex-col hover:border-primary/50 transition-colors duration-300 group">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-[28px]">ads_click</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#111218] dark:text-white text-xl font-bold leading-tight">Smart Targets</h3>
                        <p className="text-[#616789] dark:text-gray-400 text-base font-normal leading-relaxed">
                          Set weekly goals and visualize your progress with intuitive progress bars that keep you motivated.
                        </p>
                      </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex flex-1 gap-6 rounded-2xl border border-[#dbdde6] dark:border-gray-800 bg-background-light dark:bg-gray-900 p-8 flex-col hover:border-primary/50 transition-colors duration-300 group">
                      <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <span className="material-symbols-outlined text-[28px]">bar_chart</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[#111218] dark:text-white text-xl font-bold leading-tight">Detailed Reports</h3>
                        <p className="text-[#616789] dark:text-gray-400 text-base font-normal leading-relaxed">
                          Export data seamlessly for billing or analysis. Generate PDF reports or CSV dumps in seconds.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-8">
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-8 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[#111218] dark:text-white text-base font-bold transition-all">
                      <span>View all features</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-[#f0f1f4] dark:border-gray-800 bg-white dark:bg-[#101322] py-12 px-4 md:px-40 transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-[#111218] dark:text-white">
                <div className="size-6 text-primary">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_footer)">
                      <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_footer"><rect fill="white" height="48" width="48"></rect></clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="text-lg font-bold">Attendify</span>
              </div>
              <div className="flex gap-8 text-sm text-[#616789] dark:text-gray-400">
                <a className="hover:text-primary transition-colors" href="#">Privacy</a>
                <a className="hover:text-primary transition-colors" href="#">Terms</a>
                <a className="hover:text-primary transition-colors" href="#">Contact</a>
              </div>
              <div className="text-sm text-[#616789] dark:text-gray-500">
                © 2026 Tim Josjis.
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default AttendifyLanding;