import {
  Button,
  Dialog,
  Flex,
  Select as RadixSelect,
  IconButton,
  Separator,
  Switch,
  Text,
  Spinner,
} from '@radix-ui/themes';
import React from 'react';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { StartTournamentDto } from '@tennis-stats/dto';
import { ETourGenerator, IUser } from '@tennis-stats/types';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useStartTournamentMutation } from '../../../../core/api';
import { Select, TextField, useModal } from '../../../../shared/components';
import { GroupBox } from '../../../../shared/components/GroupBox/GroupBox';
import { PlusIcon, TrashIcon } from '../../../../shared/svg-icons';

import Styled from './StartTournamentModal.styles';

interface IProps {
  joinedUsers: IUser[];
  onSuccess?: (tournamentId: number) => void;
}

function StartTournamentModal(props: IProps) {
  const startTournament = useStartTournamentMutation();

  const modal = useModal();

  const form = useForm<StartTournamentDto>({
    mode: 'onChange',
    defaultValues: {
      registeredUsersIds: props.joinedUsers.map((user) => user.id),
      handleRating: true,
      tours: [
        {
          setsCount: 1,
          pairsGenerator: ETourGenerator.RANDOM,
        },
      ],
    },
    resolver: classValidatorResolver(StartTournamentDto),
  });

  const toursControl = useFieldArray({
    control: form.control,
    name: 'tours',
  });

  const isLastRow = (index: number) => index === toursControl.fields.length - 1;

  const addTour = () => {
    toursControl.append({
      setsCount: 1,
      pairsGenerator: ETourGenerator.RANDOM,
    });
  };

  const submit = (form: StartTournamentDto) => {
    startTournament.mutateAsync(form).then((tournament) => {
      modal.close();
      toast.success('Турнир успешно создан');
      props.onSuccess?.(tournament.id);
    });
  };

  return (
    <Dialog.Content maxWidth={'570px'}>
      <Dialog.Title mb={'6'}>Настройте турнир</Dialog.Title>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submit)}>
          <Flex direction={'column'} gap={'5'}>
            <GroupBox caption={'Глобальные настройки'} bgcolor={'var(--accent-1)'}>
              <Controller
                name="handleRating"
                control={form.control}
                render={({ field: { value, onChange } }) => (
                  <Text as="label" size="2">
                    <Flex gap="2">
                      <Switch size="2" checked={value} onCheckedChange={onChange} />
                      Считать рейтинг
                    </Flex>
                  </Text>
                )}
              />
            </GroupBox>

            <GroupBox caption={'Настройки туров'} bgcolor={'var(--accent-1)'}>
              <Flex direction={'column'} gap={'2'}>
                {toursControl.fields.map((field, index) => (
                  <React.Fragment key={`tour-${index}`}>
                    <Styled.TourRow
                      key={field.id}
                      mb={isLastRow(index) ? '2' : '0'}
                      gap={'4'}
                    >
                      <Text align={'left'} mb={'2'} wrap={'nowrap'}>
                        Тур № {index + 1}
                      </Text>

                      <TextField
                        size={'3'}
                        type={'number'}
                        label={'Кол-во сетов'}
                        {...form.register(`tours.${index}.setsCount`, {
                          valueAsNumber: true,
                        })}
                      />

                      <Controller
                        name={`tours.${index}.pairsGenerator`}
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

                      <IconButton
                        color={'red'}
                        variant={'soft'}
                        size={'3'}
                        mt={'5'}
                        ml={'4'}
                        onClick={() => toursControl.remove(index)}
                      >
                        <TrashIcon />
                      </IconButton>
                    </Styled.TourRow>

                    {index !== toursControl.fields.length - 1 && (
                      <Separator size={'4'} my={'2'} />
                    )}
                  </React.Fragment>
                ))}
              </Flex>

              <IconButton variant={'soft'} type={'button'} onClick={addTour}>
                <PlusIcon />
              </IconButton>
            </GroupBox>

            <Button
              variant={'solid'}
              type={'submit'}
              style={{ width: 200, alignSelf: 'flex-end' }}
              disabled={!form.formState.isValid || startTournament.isLoading}
            >
              {startTournament.isLoading && <Spinner />}
              Создать турнир
            </Button>
          </Flex>
        </form>
      </FormProvider>
    </Dialog.Content>
  );
}

export default StartTournamentModal;
