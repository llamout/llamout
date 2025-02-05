import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@workspace/ui/components/accordion';

const faqs = [
  {
    question: 'Is it really 0% commission?',
    answer: 'Of course! You receive 100% of your sales without intermediaries or commissions.',
  },
  {
    question: 'What do I need to use it?',
    answer: `An email address and a wallet compatible with <a href='https://lightningaddress.com/' target='_blank' class='pb-0.5 border-b border-gray-300 hover:border-gray-400 border-dashed duration-300'>Lightning Addresses</a>.`,
  },
  {
    question: 'How does the self-hosted version work?',
    answer: 'You download the code, install it on your server and configure it to your liking.',
  },
  {
    question: 'When will the Managed plan be available?',
    answer:
      'We are actively developing the Managed plan and enabling accounts gradually. Sign up to stay updated and be among the first to gain access.',
  },
];

export function FAQ(props: any) {
  return (
    <section {...props} className=''>
      <div className='flex flex-col max-w-4xl mx-auto px-4 md:px-0 border-x border-transparent'>
        <div className='py-16'>
          <h2 className='text-3xl font-bold text-center'>FAQs</h2>
        </div>
        <div className='w-full md:px-4 pt-4 border-t border-gray-300 border-dashed'>
          <Accordion className='flex flex-col gap-4' type='single' collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem className='bg-white border rounded-lg' key={index} value={`item-${index}`}>
                <AccordionTrigger className='p-8 cursor-pointer'>{faq.question}</AccordionTrigger>
                <AccordionContent className='px-4'>
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
