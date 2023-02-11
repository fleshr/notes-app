import notesState from '@/atoms/notesAtom';
import { auth } from '@/firebase/firebaseConfig';
import useUser from '@/hooks/useUser';
import { signOut } from 'firebase/auth';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  MdKeyboardArrowDown,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineLogout,
} from 'react-icons/md';
import { TbEdit } from 'react-icons/tb';
import { useSetRecoilState } from 'recoil';

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [isPopupShown, setIsPopupShown] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const setNotes = useSetRecoilState(notesState);
  const user = useUser();

  const handleSignOutClick = async () => {
    await signOut(auth);
    setIsPopupShown(false);
    setNotes(null);
  };

  const closePopup = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as Node)) setIsPopupShown(false);
  };

  useEffect(() => {
    if (isPopupShown) document.addEventListener('click', closePopup);

    return () => document.removeEventListener('click', closePopup);
  }, [isPopupShown]);

  const username = user?.displayName || user?.email?.split('@')[0];
  const userPhoto = user?.photoURL || '/profile.png';

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center rounded-lg border border-black/15 py-0.5 pr-0.5 pl-1.5 hover:border-black/20 hover:bg-gray-100 dark:border-white/20 dark:hover:bg-gray-800"
        onClick={() => setIsPopupShown((prev) => !prev)}
      >
        <MdKeyboardArrowDown className="mt-px" />
        <span className="ml-1 mr-2.5 font-medium">{username}</span>
        <Image
          className="rounded-md"
          src={userPhoto}
          width={28}
          height={28}
          alt="fleshr's profile picture"
        />
      </button>
      <div
        className={`absolute top-[54px] right-0 z-50 w-[170px] rounded-lg bg-white px-2.5 shadow-popup dark:bg-gray-700 ${
          isPopupShown ? 'block' : 'hidden'
        }`}
      >
        <ul className="divide-y divide-black/10 dark:divide-white/10">
          <li className="py-1.5">
            <button className="-ml-1 flex w-[calc(100%_+_8px)] items-center rounded-md px-1 py-1 hover:bg-gray-200/80 dark:hover:bg-gray-600">
              <TbEdit className="mr-2.5 flex-shrink-0 text-[22px]" />
              <span>Edit profile</span>
            </button>
          </li>
          <li className="py-1.5">
            {theme !== 'dark' ? (
              <button
                onClick={() => setTheme('dark')}
                className="-ml-1 flex w-[calc(100%_+_8px)] items-center rounded-md px-1 py-1 hover:bg-gray-200/80 dark:hover:bg-gray-600"
              >
                <MdOutlineDarkMode className="mr-2.5 flex-shrink-0 text-[22px]" />
                <span>Dark theme</span>
              </button>
            ) : (
              <button
                onClick={() => setTheme('light')}
                className="-ml-1 flex w-[calc(100%_+_8px)] items-center rounded-md px-1 py-1 hover:bg-gray-200/80 dark:hover:bg-gray-600"
              >
                <MdOutlineLightMode className="mr-2.5 flex-shrink-0 text-[22px]" />
                <span>Light theme</span>
              </button>
            )}
          </li>
          <li className="py-1.5">
            <button
              onClick={handleSignOutClick}
              className="-ml-1 flex w-[calc(100%_+_8px)] items-center rounded-md px-1 py-1 hover:bg-gray-200/80 dark:hover:bg-gray-600"
            >
              <MdOutlineLogout className="mr-2.5 text-[22px]" />
              <span>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
