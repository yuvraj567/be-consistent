import React from 'react'
import {motion} from "framer-motion"

const Hero = () => {
  return (
    <section  className="relative w-full h-screen mx-auto">
      <div className={`absolute inset-0 top-[120px] h-full max-w-7xl mx-auto sm:px-16 px-6 md:flex flex-row items-start gap-5`}>
        
        <div className=' md:w-2/5 md:my-10 text-center '>
      
         <h1 className={` font-black text-white  lg:text-[45px] sm:text-[40px] xs:text-[30px] text-[30px] lg:leading-[98px] mt-2 text-white`}>
         Level Up Your Coding Skills !!!
         </h1>
         <p className={`text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 text-white-100`}>
           Get Ready for the Next Big Coding Challenge. <br className='sm:block hidden' />
           And Be Ready to Compete, Learn, and Win !!!

          
          </p>
         
        </div>

        <div className=' md:w-2/4 lg:h-2/4 h-fit'>
        <img className='' src="hero_photo.png" alt="hero photo" />
        </div>

        
  


        </div>


        
      <div className='absolute sm:bottom-20 bottom-8 w-full flex justify-center items-center'>
        <a href='/contact'>
          <div className='w-[35px] h-[60px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 30, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-white mb-1'
            />
          </div>
        </a>
      </div>

    </section>
  )
}

export default Hero
