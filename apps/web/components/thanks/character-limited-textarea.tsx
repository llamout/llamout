'use client';

import type React from 'react';
import { useState, useCallback } from 'react';

import { Textarea } from '@workspace/ui/components/textarea';

interface CharacterLimitedTextareaProps {
  id: string;
  name: string;
  placeholder: string;
  maxLength: number;
  onChange: (value: string) => void;
}

export function CharacterLimitedTextarea({
  id,
  name,
  placeholder,
  maxLength,
  onChange,
}: CharacterLimitedTextareaProps) {
  const [text, setText] = useState('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      if (newText.length <= maxLength) {
        setText(newText);
        onChange(newText);
      }
    },
    [maxLength, onChange],
  );

  const remainingCharacters = maxLength - text.length;

  return (
    <div className='flex flex-col gap-1 text-start'>
      <Textarea id={id} name={name} placeholder={placeholder} value={text} onChange={handleChange} />
      <p className={`text-sm ${remainingCharacters === 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
        {remainingCharacters}/{maxLength} characters left
      </p>
    </div>
  );
}
