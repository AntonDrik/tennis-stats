import { addDays } from 'date-fns/addDays';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { useState } from 'react';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';
import { Button, Callout, Dialog, Flex, Heading } from '@radix-ui/themes';
import { Spinner as RadixSpinner } from '@radix-ui/themes/dist/cjs/components/spinner';
import { ISeason } from '@tennis-stats/types';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { useCreateSeasonMutation, useExtendSeasonMutation } from '../../../../core/api';
import { useModal, DialogCloseButton } from '../../../../shared/components';
import { InfoIcon } from '../../../../shared/svg-icons';

import 'react-datepicker/dist/react-datepicker.css';
import '../../../../shared/components/Datepicker/datepicker.css';

interface IProps {
  season: ISeason;
}

function ExtendSeasonModal(props: IProps) {
  const createSeason = useCreateSeasonMutation();
  const extendSeason = useExtendSeasonMutation(props.season.id);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const modal = useModal();

  const dayClass = (date?: Date): string => {
    if (!date) {
      return '';
    }

    const isInRange = isWithinInterval(date, {
      start: props.season.startDate,
      end: selectedDate ?? props.season.endDate,
    });

    const isNewRange =
      selectedDate &&
      isWithinInterval(date, {
        start: props.season.endDate,
        end: selectedDate,
      });

    if (isInRange && isNewRange) {
      return 'react-datepicker__day--in-range react-datepicker__day--temp';
    }

    if (isInRange) {
      return 'react-datepicker__day--in-range';
    }

    return '';
  };

  const datesCaption = (): string => {
    const endDate = selectedDate ?? props.season.endDate;

    const formattedStartDate = format(props.season.startDate, 'dd LLLL yyyy', { locale: ru });
    const formattedEndDate = format(endDate, 'dd LLLL yyyy', { locale: ru });

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const submit = () => {
    if (!selectedDate) {
      return;
    }

    extendSeason
      .mutateAsync({
        endDate: format(selectedDate, 'dd-MM-yyyy'),
      })
      .then(() => {
        toast.success('Сезон обновлен!');
        modal.close();
      });
  };

  return (
    <Dialog.Content>
      <DialogCloseButton />

      <Dialog.Title>Продление сезона</Dialog.Title>

      <Callout.Root color="blue" size={'1'} mb={'4'}>
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>

        <Callout.Text>
          Выберите дату окончания сезона
          <Heading size={'2'}>{datesCaption()}</Heading>
        </Callout.Text>
      </Callout.Root>

      <Flex direction={'column'} gap={'4'}>
        <DatePicker
          inline
          locale={ru}
          dayClassName={dayClass}
          showDisabledMonthNavigation
          disabledKeyboardNavigation
          minDate={addDays(props.season.endDate, 1)}
          onChange={setSelectedDate}
        />

        <Button size={'3'} mt={'3'} disabled={createSeason.isLoading} onClick={submit}>
          <RadixSpinner loading={createSeason.isLoading} />
          Продлить сезон
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default ExtendSeasonModal;
