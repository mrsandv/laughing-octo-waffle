import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './page';
import jest from 'jest'
// import { signInAction } from 'app/api';


mock('app/api', () => ({
  signInAction: jest.fn(() => Promise.resolve({
    success: false,
    message: 'Invalid credentials',
    data: { errors: [] },
  })),
}));

test('should call signInAction and display error on submit', async () => {
  render(<Login />);

  const usernameInput = screen.getByRole('textbox', { name: 'user' });
  const passwordInput = screen.getByRole('textbox', { name: 'password' });
  const submitButton = screen.getByRole('button', { type: 'submit' });

  fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.submit(submitButton);

  await expect(signInAction).toHaveBeenCalledWith({ username: 'johndoe', password: 'wrongpassword' });

  expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
});