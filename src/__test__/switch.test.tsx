import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../components/index';
import '@testing-library/jest-dom';

describe('Switch Component', () => {
  it('renders correctly with default props', () => {
    render(<Switch />);

    const input = screen.getByRole('checkbox');
    const slider = screen.getByTestId('slider');

    expect(input).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  it('renders correctly with custom label', () => {
    render(<Switch label="Label" />);

    const labelText = screen.getByText('Label');
    expect(labelText).toBeInTheDocument();
  });

  it('updates input state on click', () => {
    render(<Switch />);

    const input = screen.getByRole('checkbox');

    expect(input).not.toBeChecked();

    userEvent.click(input);

    expect(input).toBeChecked();
  });

  it('handles onChange event', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);

    const input = screen.getByRole('checkbox');

    userEvent.click(input);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});