import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@workspace/ui/components/button';
import { Awful } from '@workspace/ui/components/icons/awful';
import { Excellent } from '@workspace/ui/components/icons/excellent';
import { Good } from '@workspace/ui/components/icons/good';
import { Neutral } from '@workspace/ui/components/icons/neutral';
import { Poor } from '@workspace/ui/components/icons/poor';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { useToast } from '@workspace/ui/hooks/use-toast';

import { addNps } from '@/actions/nps';

import { CharacterLimitedTextarea } from './character-limited-textarea';

const ratingOptions = [
  { icon: Awful, label: 'Awful', value: 1 },
  { icon: Poor, label: 'Poor', value: 2 },
  { icon: Neutral, label: 'Neutral', value: 3 },
  { icon: Good, label: 'Good', value: 4 },
  { icon: Excellent, label: 'Excellent', value: 5 },
];

interface RatingSystemProps {
  onRate: (value: number) => void;
  selected: number;
}

export function RatingSystem({ onRate, selected }: RatingSystemProps) {
  return (
    <div className='flex justify-center gap-4 w-full'>
      {ratingOptions.map((option) => (
        <RatingButton
          key={option.label}
          icon={option.icon}
          label={option.label}
          value={option.value}
          onClick={() => onRate(option.value)}
          selected={selected === option.value}
        />
      ))}
    </div>
  );
}

interface RatingButtonProps {
  icon: any;
  label: string;
  value: number;
  onClick: () => void;
  selected: boolean;
}

export function RatingButton({ icon: Icon, label, onClick, selected, value }: RatingButtonProps) {
  return (
    <button
      onClick={onClick}
      id={`btn-rating-${value}`}
      className={`flex-1 flex flex-col gap-1 items-center text-sm ${selected ? 'text-foreground' : 'text-muted-foreground'}`}
    >
      <Icon className={`size-12 hover:opacity-100 ${selected ? 'opacity-100' : 'opacity-40'}`} />
      <span>{label}</span>
    </button>
  );
}

export function Feedback() {
  // Libs and hooks
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const order = searchParams.get('order');

  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState<{ description: string; value: number }>({
    description: '',
    value: 0,
  });
  const [selected, setSelected] = useState<number>(0);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await addNps({
      order_id: order || '',
      description: data?.description,
      value: data?.value,
    });

    if (error) {
      setSubmit(false);
      toast({
        variant: 'destructive',
        title: 'Oops',
        description: error,
        duration: 4000,
      });
      return null;
    }

    setSubmit(true);
    toast({
      variant: 'default',
      title: 'Feedback send',
      description: 'We appreciate your collaboration :)',
      duration: 4000,
    });
  };

  const handleDescriptionChange = (value: string) => {
    setData((prevData) => ({ ...prevData, description: value }));
  };

  if (submit || !order) return;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button id='btn-thank-feedback'>Offer feedback</Button>
      </DialogTrigger>
      <DialogContent className='max-w-sm h-auto'>
        <DialogHeader>
          <DialogTitle>Help us improve our product</DialogTitle>
          <DialogDescription>How would you like to describe your experience with the app?</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 px-4 pb-4'>
          <RatingSystem
            onRate={(value) => {
              setSelected(value);
              setData({ ...data, value });
            }}
            selected={selected}
          />
          <form onSubmit={handleSubmit} className={`${selected > 0 ? 'flex' : 'hidden'} flex-col gap-4`}>
            <CharacterLimitedTextarea
              id='experience'
              name='experience'
              placeholder='Tell us more about your experience (optional)'
              maxLength={500}
              onChange={handleDescriptionChange}
            />
            <Button id='btn-thank-feedback-submit' type='submit' disabled={selected === 0}>
              Submit feedback
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
