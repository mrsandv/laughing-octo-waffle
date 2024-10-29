import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StoreSelector } from '../components';
import type { TStore } from '../types';
import { stores } from '../constants/';


jest.mock('types', () => ({
  TStore: {
    uuid: expect.any(String),
    name: expect.any(String),
  },
}));

describe('StoreSelector component', () => {
  it('should render store names as tabs and call fetchProducts on click', () => {
    const mockFetchProducts = jest.fn();
    const mockStores: TStore[] = stores;

    render(<StoreSelector stores={mockStores} fetchProducts={mockFetchProducts} />);

    const storeTabs = screen.getAllByRole('tab');
    expect(storeTabs.length).toBe(2);

    expect(storeTabs[0]).toMatch('Store Android Challenge');
    expect(storeTabs[1]).toMatch('Store Iphone Challenge');

  });

  it('should not render any tabs if stores array is empty', () => {
    const mockFetchProducts = jest.fn();
    const emptyStores: TStore[] = [];

    render(<StoreSelector stores={emptyStores} fetchProducts={mockFetchProducts} />);

    expect(screen.queryByRole('tab')).toBeNull();
  });
});