import { cleanup, fireEvent, render, screen, waitFor, } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Modal from "./Modal";

describe('Application with Modal', () => {

    	// cleanup after each test
      afterEach(cleanup);

    test("render h1 heading of the application", () => {
        render(<App />);
        const elementH1 = screen.queryByTestId(/appTitle/i);
        expect(elementH1).toBeInTheDocument();
    });

    test("render App title", () => {
        render(<App />);
        expect(screen.getByText(/AppTitle/i)).toBeInTheDocument();
    });

    test("render open modal button", () => {
        render(<App />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test("render non-active modal as null by default", () => {
        render(<App />);
        const element = screen.queryByTestId(/mainModal/i);
        expect(element).toBeNull();
    });
    
    test("render application, simulate open modal button click that opens the modal", async () => {
        const { baseElement } = render(<App />);
        fireEvent.click(screen.queryByText('Show Modal'));
        expect(baseElement).toMatchSnapshot();
        const modal = await screen.findByText('Modal Title');
        expect(modal).toBeTruthy();
    });

    test("render modal and modal has one heading only", async () => {
        const handleHide = jest.fn;
        render(<Modal
        hide={handleHide}
        data-testid="mainModal"
      />);
      const headings = await screen.findAllByRole("heading");
      const headingLength = headings.length;
      expect(headingLength).toBe(1);
    });

    test("render modal and modal has three buttons", async () => {
        const handleHide = jest.fn;
        render(<Modal hide={handleHide} data-testid="mainModal"/>);
      const buttons = await screen.findAllByRole("button");
      const buttonLength = buttons.length;
      expect(buttonLength).toBe(3);
    });

    test("render application, open modal, and close modal with close button click", async () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const closeModalButton = await screen.findByTestId(/closeMainModal/i);
        fireEvent.click(closeModalButton);
        expect(screen.queryByText('Modal Title')).toBeNull();
    });

    test("render application, open modal, and close modal with cancel button click", async () => {
        render(<App />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        const cancelButton = await screen.findByTestId(/cancelButton/i);
        fireEvent.click(cancelButton);
        expect(screen.queryByText('Modal Title')).toBeNull();
    });

    test("render application, open modal using keyboard to focus on the button and press ENTER", async () => {
      render(<App />);
      const button = screen.queryByText('Show Modal');
      await button.focus();
      await userEvent.keyboard('[Enter]');
      const cancelButton = await screen.findByTestId(/cancelButton/i);
      await waitFor(() => expect(cancelButton).toBeInTheDocument());
  });

  test("render application, open modal, and close modal with focus on cancel button and press ENTER", async () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const cancelButton = await screen.findByTestId(/cancelButton/i);
    await cancelButton.focus();
    await userEvent.keyboard('[Enter]');
    expect(screen.queryByText('Modal Title')).toBeNull();
  });

  test("render application, open modal, and close modal with focus on close button  and press ENTER", async () => {
    render(<App />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    const closeModalButton = await screen.findByTestId(/closeMainModal/i);
    await closeModalButton.focus();
    await userEvent.keyboard('[Enter]');
    expect(screen.queryByText('Modal Title')).toBeNull();
  });


    test("user is locked in the modal and can tab through buttons using keyboard", async () => {
      const handleHide = jest.fn;
      render(<Modal hide={handleHide} data-testid="mainModal"/>);
      const closeButton = screen.getByTestId(/closeMainModal/i);
      const continueModal = screen.getByTestId(/continueModal/i);
      const cancelButton = screen.getByTestId(/cancelButton/i);
      await userEvent.tab();
      expect(closeButton).toHaveFocus();
      await userEvent.tab();
      expect(continueModal).toHaveFocus();
      await userEvent.tab();
      expect(cancelButton).toHaveFocus();
      await userEvent.tab();
      expect(closeButton).toHaveFocus();
      await fireEvent.keyDown(closeButton, {key: 'Tab', code: 'Tab', charCode: 9, shiftKey: true});
      expect(cancelButton).toHaveFocus();
    });
});
