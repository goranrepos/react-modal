import React from 'react';
import { useRef } from "react";
import Modal from "./Modal";
import "./styles.css";
import useModal from "./useModal";

/*
The modal is following the Dialog (Modal) Pattern
as defined in https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

Guidelines that were specifically implemented:
1. users cannot interact with content outside an active dialog window
2. Inert content outside an active dialog is typically visually obscured
3. Tab and Shift + Tab do not move focus outside the dialog. Moves focus to the next tabbable element inside the dialog.
4. When a dialog opens, focus moves to an element contained in the dialog
5. The modal opens with focus on the title, enables screen readers to announce the description along with the dialog title and initially focused element when the dialog opens, which is typically helpful only when the descriptive content is simple and can easily be understood without structural information.
6. Dialog container element has aria-modal set to true.
7. The element that serves as the dialog container has a role of dialog.
8. A value set for the aria-labelledby property that refers to a visible dialog title.
9. Escape: Closes the dialog.
10. When a dialog closes, focus returns to the element that invoked the dialog.
*/

export default function App() {
  const {isShowing, toggle } = useModal();

  const modalButtonRef = useRef<HTMLButtonElement>(null);

 const handleHide = () => {
    modalButtonRef.current?.focus();
    toggle(); 
  }

  return (
    <div className="App">
      <h1 data-testid="appTitle">AppTitle</h1>
      <h2>Let’s see a modal</h2>
      <button  type="button" className="button-default" onClick={toggle} ref={modalButtonRef} name="openModal">Show Modal</button>
      {isShowing && <Modal
        hide={handleHide}
        data-testid="mainModal"
      />}
    </div>
  );
}
