export function ScreenPreview({ children }: any) {
  return (
    <div className={`relative z-10 w-full max-w-4xl h-full mx-auto px-4`}>
      <div className='overflow-hidden h-full max-h-[520px] rounded-xl border border-b-0'>
        <div className='flex items-center gap-2 w-full h-8 px-4 bg-white border-b'>
          <span className='w-2 h-2 rounded-full bg-red-400'></span>
          <span className='w-2 h-2 rounded-full bg-yellow-400'></span>
          <span className='w-2 h-2 rounded-full bg-green-400'></span>
        </div>
        {children}
      </div>
    </div>
  );
}
