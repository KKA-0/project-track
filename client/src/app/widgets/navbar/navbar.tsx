"use client"

import * as React from 'react';
import { useSearchParams } from "next/navigation";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Menu, X, ChevronDown, Zap, User } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/libs/hooks/hooks";
import Cookies from 'js-cookie';
// import {getPlaylist} from "@/libs/features/playlists.slice"

const pages = ['Products', 'Open Source', 'Developers'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const StatePlaylists = useSelector((state: any) => state.store.playlists);

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const playlistId = params.playlistId as string;

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [isUser, setIsUser] = React.useState(true);

  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

  // Close user menu when clicking outside
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setUserMenuOpen(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsUser(!token);
  }, []);

  const handleLogout = () => {
    console.log("logout request")
    Cookies.remove('access_token', {
      path: '/',
      sameSite: 'Strict',
      secure: true,
    });
    setIsUser(true);
    window.location.reload();
    // dispatch(getPlaylist({}))
  };

  return (
    <nav className="bg-black bg-opacity-90 border-b border-cyan-900/30 backdrop-blur-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="./" className="flex items-center">
              <Zap className="h-8 w-8 text-purple-400 mr-2" />
              <span className="text-white font-mono text-xl font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                DIYAN
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {pages.map((page) => (
              <Link
                key={page}
                href="#"
                className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ease-in-out"
              >
                {page}
              </Link>
            ))}

            {/* Progress bar */}
            {playlistId && (
              <div className="mx-4 w-40">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${StatePlaylists[playlistId]?.completed || 0}%` }}
                  />
                </div>
                <div className="text-xs text-cyan-400 mt-1 text-right">
                  {Number(StatePlaylists[playlistId]?.completed || 0).toFixed(1)}%
                </div>
              </div>
            )}

            {/* User menu */}
            {isUser ? (
              <Link href="/auth">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out"
                >
                  Login to Sync
                </button>
              </Link>
            ) : (
              <div className="relative ml-3" ref={menuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5">
                    <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-400" />
                    </div>
                  </div>
                  <ChevronDown className={`ml-1 h-4 w-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* User dropdown menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-cyan-900/50 rounded-md shadow-lg py-1 z-50 backdrop-blur-sm">
                    {settings.map((setting) => (
                      <Link
                        key={setting}
                        href="#"
                        onClick={setting === "Logout" ? handleLogout : undefined}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400"
                      >
                        {setting}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {playlistId && (
              <div className="mr-4 w-20">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${StatePlaylists[playlistId]?.completed || 0}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6 text-cyan-400" />
              ) : (
                <Menu className="block h-6 w-6 text-cyan-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-sm border-t border-cyan-900/30 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {pages.map((page) => (
              <Link
                key={page}
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400"
              >
                {page}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-cyan-900/30">
            <div className="flex items-center px-5">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 p-0.5">
                <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">User Name</div>
                <div className="text-sm font-medium text-gray-400">user@example.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              {settings.map((setting) => (
                <Link
                  key={setting}
                  href="#"
                  onClick={setting === "Logout" ? handleLogout : undefined}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-cyan-900/20 hover:text-cyan-400"
                >
                  {setting}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;