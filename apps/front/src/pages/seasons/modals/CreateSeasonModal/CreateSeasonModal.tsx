import { Button, Callout, Dialog, Flex, Heading } from '@radix-ui/themes';
import { Spinner as RadixSpinner } from '@radix-ui/themes/dist/cjs/components/spinner';
import { addDays } from 'date-fns/addDays';
import { format } from 'date-fns/format';
import { ru } from 'date-fns/locale';
import { useMemo, useState } from 'react';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { toast } from 'react-hot-toast';

import { useCreateSeasonMutation, useGetLastFinishedSeasonQuery } from '../../../../core/api';
import { InfoIcon } from '../../../../shared/svg-icons';
import { useModal } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';

import 'react-datepicker/dist/react-datepicker.css';
import '../../../../shared/components/Datepicker/datepicker.css';

function CreateSeasonModal() {
  const createSeason = useCreateSeasonMutation();
  const lastFinishedSeason = useGetLastFinishedSeasonQuery();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const modal = useModal();

  const minDate = useMemo(() => {
    return addDays(lastFinishedSeason.data?.endDate ?? new Date(), 1);
  }, [lastFinishedSeason.data]);

  const datesCaption = (): string => {
    if (!startDate) {
      return '';
    }

    const formattedStartDate = format(startDate, 'dd LLLL yyyy', { locale: ru });
    const formattedEndDate = endDate ? format(endDate, 'dd LLLL yyyy', { locale: ru }) : '';

    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const submit = () => {
    if (!startDate || !endDate) {
      return;
    }

    createSeason
      .mutateAsync({
        startDate: format(startDate, 'dd-MM-yyyy'),
        endDate: format(endDate, 'dd-MM-yyyy'),
      })
      .then(() => {
        toast.success('Сезон создан!');
        modal.close();
      });
  };

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Dialog.Content>
      <DialogCloseButton />

      <Dialog.Title>Создание сезона</Dialog.Title>

      <Callout.Root color="blue" size={'1'} mb={'4'}>
        <Callout.Icon>
          <InfoIcon />
        </Callout.Icon>

        <Callout.Text>
          Выберите дату начала и окончания сезона
          <Heading size={'2'}>{datesCaption()}</Heading>
        </Callout.Text>
      </Callout.Root>

      <Flex direction={'column'} gap={'4'}>
        <DatePicker
          inline
          selectsRange
          locale={ru}
          disabledKeyboardNavigation
          minDate={minDate}
          startDate={startDate}
          endDate={endDate}
          onChange={onChangeDate}
        />

        <Button size={'3'} mt={'3'} disabled={createSeason.isLoading} onClick={submit}>
          <RadixSpinner loading={createSeason.isLoading} />
          Создать
        </Button>
      </Flex>
    </Dialog.Content>
  );
}

export default CreateSeasonModal;
