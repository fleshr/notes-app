import filterState from '@/atoms/filterAtom';
import { COLORS } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IoOptions } from 'react-icons/io5';
import { MdOutlineCheck } from 'react-icons/md';
import { useRecoilState } from 'recoil';

interface IProps {
  onNewNoteClick: () => void;
}

const NotesHeader: React.FC<IProps> = ({ onNewNoteClick }) => {
  const [isFilterShown, setIsFilterShown] = useState(false);
  const [filter, setFilter] = useRecoilState(filterState);

  const handleFilterClick = (color: string) => {
    if (!filter.includes(color)) setFilter((prev) => [...prev, color]);

    if (filter.includes(color))
      setFilter((prev) => prev.filter((item) => item !== color));
  };

  useEffect(() => {});

  return (
    <div className="my-7.5 flex flex-wrap gap-y-3">
      <button
        onClick={() => onNewNoteClick()}
        className="mr-auto flex h-9 flex-shrink-0 items-center rounded-lg border border-black/15 bg-white pl-3.5 pr-2.5 hover:border-black/20 hover:bg-gray-100 dark:border-white/20 dark:bg-gray-700 dark:hover:bg-gray-800 sm:order-1"
      >
        <span className="font-medium">New note</span>
        <FiPlus className="ml-1 text-lg" />
      </button>
      <button
        onClick={() => setIsFilterShown((prev) => !prev)}
        className="ml-2.5 flex h-9 w-9 items-center justify-center justify-self-end rounded-lg border border-black/15 bg-white hover:bg-gray-100 dark:border-white/20 dark:bg-gray-700 dark:hover:bg-gray-800 sm:order-3"
      >
        <IoOptions className="text-lg" />
      </button>
      {isFilterShown && (
        <div className="mr-0.5 flex w-full flex-wrap items-center justify-end gap-1 sm:order-2 sm:w-auto">
          <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
            Filter by color:
          </span>
          {Object.keys(COLORS).map((color) => {
            const isSelected = filter.includes(color);
            const colorClass = COLORS[color as keyof typeof COLORS];
            const bgColor = isSelected
              ? `${colorClass} hover:brightness-95 dark:hover:brightness-110`
              : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800';
            return (
              <button
                key={color}
                onClick={() => handleFilterClick(color)}
                className={`contra flex h-8 w-8 items-center justify-center rounded-lg border border-black/15 dark:border-white/20 ${bgColor}`}
              >
                {isSelected ? (
                  <MdOutlineCheck className="opacity-80" />
                ) : (
                  <div
                    className={`h-3 w-3 rounded-full border border-black/10 ${colorClass} dark:border-white/10`}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotesHeader;
