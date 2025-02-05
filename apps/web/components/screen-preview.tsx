export function ScreenPreview({ children, show }: any) {
  return (
    <div
      className={`relative w-full max-w-[1024px] px-8 duration-300 ${
        show ? 'opacity-100 top-0 h-auto' : 'opacity-0 top-12 h-0'
      }`}
    >
      <div className='overflow-hidden h-full max-h-[520px] rounded-t-xl border border-b-0 shadow-lg'>
        <div className='flex items-center gap-2 w-full h-8 px-4 bg-white border-b'>
          <span className='w-3 h-3 rounded-full bg-red-400'></span>
          <span className='w-3 h-3 rounded-full bg-yellow-400'></span>
          <span className='w-3 h-3 rounded-full bg-green-400'></span>
        </div>
        {children}
      </div>
    </div>
  );
}
