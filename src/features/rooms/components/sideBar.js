import React, { useState } from 'react';

const SideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
   <button type="button" onClick={toggleDrawer} aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-3.5 left-3 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
   <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="w-6 h-6"
>
  <path d="M0 0h24v24H0z" fill="none" />
  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
</svg>

        <span className="sr-only">Close menu</span> 
      </button>
    <div className={` fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? '' : '-translate-x-full'} bg-AuthBtn-0`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
      <h5 id="drawer-navigation-label" className="mt-6 ml-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Friend List</h5>
      <button type="button" onClick={toggleDrawer} aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-3 left-15 ml-48 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <div className="py-4 overflow-y-auto">
      <ul  className="mt-5 space-y-2 font-medium">
     
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
             
               <span className="flex-1 ml-3 whitespace-nowrap">Friend 1</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              
               <span className="flex-1 ml-3 whitespace-nowrap">Friend 2</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span className="flex-1 ml-3 whitespace-nowrap">Friend 3</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <span className="flex-1 ml-3 whitespace-nowrap">Friend 4</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">              
               <span className="flex-1 ml-3 whitespace-nowrap">Friend 5</span>
            </a>
         </li>
      </ul>
      </div>
    </div>
</>
  );
};

export default SideBar;