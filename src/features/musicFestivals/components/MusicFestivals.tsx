import { useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

import { Bands } from './Bands';
import { groupDataByRecordLabels } from '../utils/festivalsUtils';
import { useFestivals } from '../hooks/useFestivals';

export const MusicFestivals = () => {
  const { data, isError, error, isLoading } = useFestivals();
  const [accordionStatus, setAccordionStatus] = useState<
    Record<number, boolean>
  >({});

  const handleAccordionOnClick = (index: number) => {
    setAccordionStatus((prevState) => {
      return { ...prevState, [index]: !prevState[index] };
    });
  };

  if (isLoading || !data) return <>Loading ...</>;
  if (isError) return <>Toast Alert: {error.message}</>;

  const recordLabelGroups = groupDataByRecordLabels(data);
  return (
    <>
      {Object.keys(recordLabelGroups).map((recordLabel, index) => (
        <Accordion
          open={!!accordionStatus[index]}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          key={index + 1}
        >
          <AccordionHeader onClick={() => handleAccordionOnClick(index)}>
            {recordLabel}
          </AccordionHeader>
          <AccordionBody>
            <Bands bandsUnderSameRecordLabel={recordLabelGroups[recordLabel]} />
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
};
