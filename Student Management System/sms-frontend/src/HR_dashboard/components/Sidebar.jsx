import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  ClipboardIcon,
  UserGroupIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Dashboard', path: '/hr', icon: HomeIcon },
  { name: 'Students', path: '/hr/students', icon: UsersIcon },
  { name: 'Batches', path: '/hr/batches', icon: ClipboardIcon },
  { name: 'Trainers', path: '/hr/trainers', icon: UserGroupIcon },
  { name: 'Change Request', path: '/hr/request', icon: UserGroupIcon },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = (
    <nav className="flex flex-col space-y-2">
      {navLinks.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-gray-700 ${
              isActive ? 'bg-gray-700 font-semibold' : ''
            }`
          }
          onClick={() => setIsOpen(false)} // close mobile menu on link click
          end
        >
          <Icon className="h-5 w-5" />
          <span>{name}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile Navbar */}
      <header className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="text-xl font-bold">HR Dashboard</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="focus:outline-none"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile menu dropdown (slides down below navbar) */}
      <div
        className={`lg:hidden bg-gray-900 text-white fixed top-16 left-0 right-0 overflow-hidden transition-[max-height] duration-300 ease-in-out z-40 ${
          isOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4">{NavItems}</div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen lg:bg-gray-900 lg:text-white fixed top-0 left-0 z-40">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          HR Dashboard
        </div>
        <nav className="flex-1 overflow-y-auto mt-6 px-4 space-y-2">{NavItems}</nav>
      </aside>

      {/* Spacer for mobile so content doesn’t go under fixed navbar */}
      <div className="lg:hidden h-16" />
    </>
  );
}
