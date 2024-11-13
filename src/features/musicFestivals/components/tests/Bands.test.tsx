import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Bands } from '../Bands';
import { BandGroups } from '../../types/festivalsType';

const mockData: BandGroups[] = [
  { name: 'Band 1', recordLabel: 'Label 1', festival: 'Festival A' },
  { name: 'Band 2', recordLabel: 'Label 1', festival: 'Festival A' },
  { name: 'Band 1', recordLabel: 'Label 1', festival: 'Festival B' },
  { name: 'Band 3', recordLabel: 'Label 2', festival: 'Festival C' },
];

describe('Bands Component', () => {
  it('should render the bands and festivals', () => {
    render(<Bands bandsUnderSameRecordLabel={mockData} />);

    expect(screen.getByText('Band 1')).toBeInTheDocument();
    expect(screen.getByText('Band 2')).toBeInTheDocument();
    expect(screen.getByText('Band 3')).toBeInTheDocument();

    expect(screen.queryByText('Festival A')).not.toBeVisible();
    expect(screen.queryByText('Festival B')).not.toBeVisible();
    expect(screen.queryByText('Festival C')).not.toBeVisible();
  });

  it('should expand and collapse the accordion when clicked', () => {
    render(<Bands bandsUnderSameRecordLabel={mockData} />);

    const accordionHeader = screen.getByText('Band 1');
    fireEvent.click(accordionHeader);

    expect(screen.getByText('Festival A')).toBeVisible();
    expect(screen.getByText('Festival B')).toBeVisible();

    fireEvent.click(accordionHeader);

    expect(screen.queryByText('Festival A')).not.toBeVisible();
    expect(screen.queryByText('Festival B')).not.toBeVisible();
  });
});
