import { useState } from 'react';

interface IUseModal {
    isShowing: boolean;
    toggle: () => void;
}

const useModal = ():IUseModal => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
  }
};

export default useModal;