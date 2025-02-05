import { Form } from './form';

export function Hero() {
  return (
    <div className='relative w-full max-w-3xl mt-16 mx-auto py-16 md:py-32'>
      <section className='relative flex flex-col gap-4 text-center px-4'>
        <h1 className='text-4xl md:text-6xl md:leading-tight font-bold mb-4 tracking-tighter text-balance'>
          Digital Payments for Digital Natives 🚀
        </h1>
        <div className='max-w-xl mx-auto tracking-tighter text-balance'>
          <p className='text-xl mb-8'>
            An open-source payment system designed to allow you to offer your products or services without commission.
          </p>
        </div>
        <Form />
      </section>
    </div>
  );
}
