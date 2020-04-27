import { useState } from 'react'

const useSideBar = () => {
  const [showSideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(!showSideBar);
  }
  return [showSideBar, toggleSideBar];
}

export default useSideBar