'use client';

import * as React from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  filename?: string | null;
  highlightedLines?: number[];
  showLineNumbers?: boolean;
  enableCopy?: boolean;
  enableDownload?: boolean;
}

interface CodeBlockContextValue {
  code: string;
  language?: string;
  filename?: string | null;
  highlightedLines?: number[];
  showLineNumbers?: boolean;
}

const CodeBlockContext = React.createContext<CodeBlockContextValue | undefined>(undefined);

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  (
    {
      code,
      language = 'tsx',
      filename = null,
      highlightedLines = [],
      showLineNumbers = true,
      enableCopy = true,
      enableDownload = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <CodeBlockContext.Provider
        value={{
          code,
          language,
          filename,
          highlightedLines,
          showLineNumbers,
        }}
      >
        <div className='relative overflow-hidden rounded-lg border bg-black/85 text-white'>
          {filename && (
            <div className='flex items-center justify-between bg-black/95 px-4 py-2'>
              <p className='text-sm text-white'>{filename}</p>
              <div className='flex items-center gap-2'>{enableCopy && <CodeBlockCopy />}</div>
            </div>
          )}
          {!filename && (
            <div className='absolute right-4 top-3 z-10 flex items-center gap-2'>{enableCopy && <CodeBlockCopy />}</div>
          )}
          <pre
            ref={ref}
            className={cn('overflow-x-auto p-4 text-sm', showLineNumbers && 'md:pl-12', className)}
            {...props}
          >
            <code className={`language-${language}`}>
              {code.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {showLineNumbers && (
                    <span className='absolute left-0 hidden md:inline-block w-8 select-none text-right text-muted-foreground'>
                      {i + 1}
                    </span>
                  )}
                  <div className={cn('inline-block w-full', highlightedLines.includes(i + 1) && 'bg-muted/20')}>
                    {line || ' '}
                  </div>
                  {i < code.split('\n').length - 1 && '\n'}
                </React.Fragment>
              ))}
            </code>
          </pre>
          {children}
        </div>
      </CodeBlockContext.Provider>
    );
  },
);
CodeBlock.displayName = 'CodeBlock';

const useCodeBlock = () => {
  const context = React.useContext(CodeBlockContext);
  if (!context) {
    throw new Error('useCodeBlock must be used within a CodeBlock');
  }
  return context;
};

interface CodeBlockCopyProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CodeBlockCopy = React.forwardRef<HTMLButtonElement, CodeBlockCopyProps>(({ className, ...props }, ref) => {
  const { code } = useCodeBlock();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [hasCopied]);

  return (
    <button
      ref={ref}
      className={cn(
        'rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className,
      )}
      onClick={() => {
        navigator.clipboard.writeText(code);
        setHasCopied(true);
      }}
      {...props}
    >
      {hasCopied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
      <span className='sr-only'>{hasCopied ? 'Copiado' : 'Copiar código'}</span>
    </button>
  );
});
CodeBlockCopy.displayName = 'CodeBlockCopy';

export { CodeBlock, CodeBlockCopy };
