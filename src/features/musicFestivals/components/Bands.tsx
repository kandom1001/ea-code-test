import React, { memo } from 'react';
import { useState } from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { BandGroups } from '../types/festivalsType';

type BandsType = {
  bandsUnderSameRecordLabel?: BandGroups[];
};

export const Bands: React.FC<BandsType> = memo(
  ({ bandsUnderSameRecordLabel }) => {
    const [accordionStatus, setAccordionStatus] = useState<
      Record<number, boolean>
    >({});

    const handleAccordionOnClick = (index: number) => {
      setAccordionStatus((prevState) => {
        return { ...prevState, [index]: !prevState[index] };
      });
    };

    if (!bandsUnderSameRecordLabel) return null;

    const BandGroups = Object.groupBy(
      bandsUnderSameRecordLabel,
      ({ name }) => name
    );

    const getFestivals = (bandFestivals?: BandGroups[]) => {
      return bandFestivals
        ?.map((band) => band.festival)
        .filter((value, index, self) => self.indexOf(value) === index);
    };

    return (
      <>
        {Object.keys(BandGroups).map((band, index) => {
          const festivals = getFestivals(BandGroups[band]);
          return (
            <Accordion
              open={!!accordionStatus[index]}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4"
              key={index + 1}
            >
              <AccordionHeader onClick={() => handleAccordionOnClick(index)}>
                {band}
              </AccordionHeader>
              <AccordionBody>
                <ul>
                  {festivals &&
                    festivals.map((festival, index) => (
                      <li key={index}>{festival}</li>
                    ))}
                </ul>
              </AccordionBody>
            </Accordion>
          );
        })}
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      JSON.stringify(prevProps.bandsUnderSameRecordLabel) ===
      JSON.stringify(nextProps.bandsUnderSameRecordLabel)
    );
  }
);
