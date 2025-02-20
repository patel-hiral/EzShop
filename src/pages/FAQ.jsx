import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"

function FAQ() {
  return (
    <section className='px-4'>
      <h2 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How can I track my order?</AccordionTrigger>
          <AccordionContent>
            You can track your order by logging into your account and navigating to the 'Orders' section.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards, PayPal, and various digital wallets.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I return an item?</AccordionTrigger>
          <AccordionContent>
            You can initiate a return through the 'My Orders' section within 30 days of purchase.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Do you offer international shipping?</AccordionTrigger>
          <AccordionContent>
            Yes, we ship to most countries worldwide. Shipping charges vary based on location.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Can I change my delivery address after placing an order?</AccordionTrigger>
          <AccordionContent>
            Address changes can be requested within 12 hours of placing the order by contacting our support team.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>What if I receive a damaged product?</AccordionTrigger>
          <AccordionContent>
            If you receive a damaged item, please contact customer support with photos of the product for a replacement or refund.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default FAQ;
