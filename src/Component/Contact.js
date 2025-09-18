import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import Footer from "./Footer";

function Contact() {
  document.title = "Contact - Be Consistent";
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  let [btn_text, setBtnText] = useState("Send Message");
  const [loading, setLoading] = useState(false);
  const form = useRef();

  async function submitHandler(event) {
    let result;
    console.log(btn_text)
    event.preventDefault();
    setBtnText("Sending");
    setLoading(true);
    try {
      result = await emailjs.sendForm('service_s9rog6w', 'template_i4pog28', form.current, process.env.REACT_APP_API_KEY);
      if (result.status !== 200) toast.error('Error Sending Message !!');
      else toast.success('Message sent successfully !!');
    }
    catch (error) {
      console.log(error.text);
      toast.error('Error Sending Message !!');
    }
    finally {
      setEmail(""); setMessage(""); setName(""); setSubject("");
      setBtnText("Send Message");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
              <div className="w-20 h-1 bg-blue-500 mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600">Got a technical issue? Want to send feedback? Let us know.</p>
            </div>
            
            <form ref={form} className="space-y-6" onSubmit={submitHandler}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  name="username" 
                  onChange={(event) => setName(event.target.value)} 
                  value={username} 
                  autoComplete="off" 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  placeholder="John Doe" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input 
                  name="email" 
                  onChange={(event) => setEmail(event.target.value)} 
                  value={email} 
                  autoComplete="off" 
                  required 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  placeholder="mail@email.com" 
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  name="subject" 
                  onChange={(event) => setSubject(event.target.value)} 
                  value={subject} 
                  autoComplete="off" 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  placeholder="Let us know how we can help you" 
                  required 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea 
                  name="message" 
                  onChange={(event) => setMessage(event.target.value)} 
                  value={message} 
                  autoComplete="off" 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  placeholder="Leave a comment..." 
                  required
                ></textarea>
              </div>
              
              <div className="pt-4">
                <button 
                  disabled={loading} 
                  type="submit" 
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Contact;