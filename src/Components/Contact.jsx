import React,{useState}from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../Pass';

    const Contact = () => {
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [stateMessage, setStateMessage] = useState(null);
        const sendEmail = (e) => {
          e.persist();
          e.preventDefault();
          setIsSubmitting(true);
          emailjs.sendForm(
            EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.target, EMAILJS_USER_ID
            )
            .then(
              (result) => {
                setStateMessage('Message sent!');
                setIsSubmitting(false);
                setTimeout(() => {
                  setStateMessage(null);
                }, 5000); // hide message after 5 seconds
              },
              (error) => {
                setStateMessage('Something went wrong, please try again later');
                setIsSubmitting(false);
                setTimeout(() => {
                  setStateMessage(null);
                }, 5000); // hide message after 5 seconds
              }
            );
          
          // Clears the form after sending the email
          e.target.reset();
        };
  return (
    <>
<section className="pt-5">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="text-indigo-400 text-4xl font-bold font-manrope leading-normal text-center">Kontakt</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-200  sm:text-xl">Jeśli znalazłeś jakiś błąd, lub chcesz zaproponować zmiany to zapraszam do wypełnienia formularza kontaktowego.</p>
      <form onSubmit={sendEmail} className="space-y-8">
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Twój email</label>
              <input type="email" id="email" name="user_email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 " placeholder="name@gmail.com" required />
          </div>
          <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Temat</label>
              <input type="text" id="subject" name="user_name" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Napisz czego potrzebujesz..." required />
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Twoja wiadmość</label>
              <textarea id="message" rows="6" name="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 " placeholder="Zostaw wiadmość...."></textarea>
          </div>
          <input type="submit" value="Wyślij" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" disabled={isSubmitting}/>
          {stateMessage && <p>{stateMessage}</p>}
      </form>
    </div>
    </section>

    </>
  );
}

export default Contact;