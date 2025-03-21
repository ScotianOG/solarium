import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '@/components/ui/switch';

describe('Switch Component', () => {
  it('renders correctly', () => {
    render(<Switch aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('starts unchecked by default', () => {
    render(<Switch aria-label="Toggle" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('can be checked initially', () => {
    render(<Switch aria-label="Toggle" checked />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    const switchElement = screen.getByRole('switch');
    
    expect(switchElement).not.toBeChecked();
    await user.click(switchElement);
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies custom className', () => {
    render(<Switch aria-label="Toggle" className="custom-class" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-class');
  });

  it('can be disabled', () => {
    render(<Switch aria-label="Toggle" disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });
});
