import { useEffect, useState } from 'react';
import { Check, GameController } from "phosphor-react";
import toast, { Toaster } from 'react-hot-toast';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';

import { FormInput } from "./form-input";
import { Game } from './games-carousel';
import { FormToggleItem } from './form-toggle-item';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { createAd, CreateAdType } from '../api/ads';

type FormStateProps = CreateAdType

function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormStateProps>();

  useEffect(() => {
    fetch('http://localhost:3333/games/')
      .then(response => response.json())
      .then(data => setGames(data));
  }, [])

  const onSubmit = async (data: FormStateProps) => {
    toast.promise(
      createAd(data),
       {
         loading: 'Salvando anúncio...',
         success: <b>Anúncio publicado!</b>,
         error: <b>Oops! Ocorreu um erro inesperado =(</b>,
       }
     );
  };

  return (
    <>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed">
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-6">
              <Controller
                name="gameId"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="gameId" className="font-semibold">Qual o game?</label>
                    <Select.Root value={field.value} onValueChange={field.onChange}>
                      <Select.Trigger
                        className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 justify-center items-center gap-5 inline-flex">
                        <Select.Value placeholder="Selecione o game que deseja jogar" />
                        <Select.Icon />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg shadow-black">
                          <Select.Viewport className="p-1">
                            {games.map(game => (
                              <Select.Item
                                key={game.id}
                                value={game.id}
                                className="text-violet-800 hover:bg-violet-900 hover:text-white relative pr-8 pl-6 rounded-sm hover:cursor-pointer"
                              >
                                <Select.ItemText>{game.name}</Select.ItemText>
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>

                    </Select.Root>
                  </div>
                )}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <FormInput id="name" placeholder="Como te chamam dentro do game?" register={register} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <FormInput id="yearsPlaying" placeholder="Tudo bem ser ZERO" type="number" register={register} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <FormInput id="discord" placeholder="Usuário#0000" register={register} />
                </div>
              </div>

              <div className="flex gap-6">
                <Controller
                  name="weekDays"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>
                      <ToggleGroup.Root
                        type="multiple"
                        className="grid grid-cols-4 gap-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormToggleItem value="0" title="Domingo" checked={field.value.includes('0')} />
                        <FormToggleItem value="1" title="Segunda" checked={field.value.includes('1')} />
                        <FormToggleItem value="2" title="Terça" checked={field.value.includes('2')} />
                        <FormToggleItem value="3" title="Quarta" checked={field.value.includes('3')} />
                        <FormToggleItem value="4" title="Quinta" checked={field.value.includes('4')} />
                        <FormToggleItem value="5" title="Sexta" checked={field.value.includes('5')} />
                        <FormToggleItem value="6" title="Sábado" checked={field.value.includes('6')} />
                      </ToggleGroup.Root>
                    </div>
                  )}
                />
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <FormInput id="hourStart" type="time" placeholder="De" className="appearance-none" register={register} />
                    <FormInput id="hourEnd" type="time" placeholder="Até" className="appearance-none" register={register} />
                  </div>
                </div>
              </div>

              <Controller
                name="useVoiceChannel"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900" value={field.value} onCheckedChange={field.onChange}>
                      <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    Costumo me conectar ao chat de voz
                  </div>
                )}
              />

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
      <Toaster />
    </>
  )
}

export default CreateAdModal;