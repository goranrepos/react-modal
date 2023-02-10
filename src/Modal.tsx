import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import "./Modal.css";

interface IModal {
    hide: () => void;
}

const Modal = ({ hide }:IModal) => {

    const modalRef = useRef<HTMLDivElement>(null);
    const handleTabKey = (e: KeyboardEvent): void => {
        if(!modalRef.current) return;
      const focusableModalElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );
      const firstElement = focusableModalElements[0];
      const lastElement =
        focusableModalElements[focusableModalElements.length - 1];
  
      if (!e.shiftKey && document.activeElement === lastElement) {
        (firstElement as HTMLElement).focus();
       
        return e.preventDefault();
      }
  
      if (e.shiftKey && document.activeElement === firstElement) {
         (lastElement as HTMLElement).focus();
         
        e.preventDefault();
      }
    };

    const keyListenersMap =[
        {
            key: 'Escape',
            value: hide
        }, {
            key: 'Tab',
            value: handleTabKey 
        }];

    useEffect(() => {
        function keyListener(e: KeyboardEvent) {
            
          const listener = keyListenersMap.find(keyListener => {     
            return (keyListener.key === e.key) })?.value;
          return listener && listener(e);
        }
        document.addEventListener("keydown", keyListener);
    
        return () => document.removeEventListener("keydown", keyListener);
      });

   return (
    ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"/>
          <div className="modal-wrapper" aria-modal role="dialog" aria-labelledby="dialog1_label">
            <div className="modal" ref={modalRef}>
              <div className="modal-header">
                <button type="button" data-testid="closeMainModal" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <h2 id="dialog1_label" className="dialog_label" tabIndex={-1}>Modal Title</h2>
              <p>
                Hello, I'm a modal.
              </p>
              </div>
             
              <div className="modal-footer">
                <button data-testid="continueModal">Continue</button>
                <button
                  onClick={hide}
                  id="cancelBtn"
                  data-testid="cancelButton"
                >
                  Cancel
                </button>
                
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      )
   );
    };

export default Modal;