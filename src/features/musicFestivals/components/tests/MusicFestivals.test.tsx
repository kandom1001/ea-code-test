import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MusicFestivals } from '../MusicFestivals';
import { useFestivals } from '../../hooks/useFestivals';
import { groupDataByRecordLabels } from '../../utils/festivalsUtils';

jest.mock('../hooks/useFestivals', () => ({
  useFestivals: jest.fn(),
}));
jest.mock('../utils/festivalsUtils', () => ({
  groupDataByRecordLabels: jest.fn(),
}));

const mockUseFestivals = useFestivals as jest.Mock;
const mockGroupDataByRecordLabels = groupDataByRecordLabels as jest.Mock;

describe('MusicFestivals Component', () => {
  it('should display loading state initially', () => {
    mockUseFestivals.mockReturnValue({
      isError: false,
      data: undefined,
      error: null,
      isLoading: true,
    });

    render(<MusicFestivals />);

    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('should display an error message when there is an error', () => {
    mockUseFestivals.mockReturnValue({
      status: 'error',
      data: null,
      error: { message: 'Failed to fetch data' },
      isLoading: false,
    });

    render(<MusicFestivals />);

    expect(
      screen.getByText(/Error: Failed to fetch data/i)
    ).toBeInTheDocument();
  });

  it('should display the accordion with data when data is loaded', () => {
    const mockData = [
      { name: 'Band 1', recordLabel: 'Label 1', festival: 'Festival A' },
      { name: 'Band 2', recordLabel: 'Label 1', festival: 'Festival A' },
      { name: 'Band 3', recordLabel: 'Label 2', festival: 'Festival B' },
    ];

    mockUseFestivals.mockReturnValue({
      status: 'success',
      data: mockData,
      error: null,
      isLoading: false,
    });

    mockGroupDataByRecordLabels.mockReturnValue({
      'Label 1': mockData.filter((band) => band.recordLabel === 'Label 1'),
      'Label 2': mockData.filter((band) => band.recordLabel === 'Label 2'),
    });

    render(<MusicFestivals />);

    expect(screen.getByText('Label 1')).toBeInTheDocument();
    expect(screen.getByText('Label 2')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Label 1'));
    expect(screen.getByText('Band 1')).toBeInTheDocument();
    expect(screen.getByText('Band 2')).toBeInTheDocument();
  });
});
