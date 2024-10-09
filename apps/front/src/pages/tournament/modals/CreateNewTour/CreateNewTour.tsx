import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, Dialog, Flex, Select as RadixSelect, Spinner } from '@radix-ui/themes';
import { CreateTourDto } from '@tennis-stats/dto';
import { ETourGenerator } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAddTourMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { Select, TextField, useModal } from '../../../../shared/components';
import { DialogCloseButton } from '../../../../shared/components/Modals';
import { getTextFieldError } from '../../../../utils';

function CreateNewTour() {
  const tournamentState = useAtomValue(tournamentAtom);

  const addTourMutation = useAddTourMutation(tournamentState.selectedTournament?.id);

  const form = useForm<CreateTourDto>({
    mode: 'onChange',
    defaultValues: {
      setsCount: 1,
      pairsGenerator: ETourGenerator.RANDOM,
    },
    resolver: classValidatorResolver(CreateTourDto),
  });

  const modal = useModal();

  const submit = (form: CreateTourDto) => {
    addTourMutation.mutateAsync(form).then(() => {
      modal.close();
      toast.success('Тур успешно добавлен');
    });
  };

  return (
    <Dialog.Content
      maxWidth={'300px'}
      onOpenAutoFocus={(event) => event.preventDefault()}
    >
      <DialogCloseButton />

      <Dialog.Title>Добавить тур</Dialog.Title>

      <form onSubmit={form.handleSubmit(submit)}>
        <Flex gap={'3'} mt={'1'} direction={'column'}>
          <TextField
            size={'3'}
            type={'number'}
            label={'Кол-во сетов'}
            {...form.register('setsCount', { valueAsNumber: true })}
            {...getTextFieldError(form.formState.errors, 'setsCount')}
          />

          <Controller
            name={'pairsGenerator'}
            control={form.control}
            render={({ field }) => (
              <Select
                label={'Генерация матчей'}
                size={'3'}
                value={field.value}
                onValueChange={field.onChange}
              >
                <RadixSelect.Trigger />

                <RadixSelect.Content>
                  <RadixSelect.Item value={ETourGenerator.RANDOM}>
                    Рандом
                  </RadixSelect.Item>
                </RadixSelect.Content>
              </Select>
            )}
          />
        </Flex>

        <Flex justify={'end'} mt={'3'}>
          <Button
            variant={'solid'}
            type={'submit'}
            disabled={!form.formState.isValid || addTourMutation.isLoading}
          >
            {addTourMutation.isLoading && <Spinner />}
            Добавить
          </Button>
        </Flex>
      </form>
    </Dialog.Content>
  );
}

export default CreateNewTour;
