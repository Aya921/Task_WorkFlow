import { useNavigate } from "react-router-dom";
import { FONT_STYLES } from "../../../assets/fonts/font_style";
import {  useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export const HomePage = () => {
  const navigate = useNavigate();
  const one = useRef(null);
  const two = useRef(null);
  const three = useRef(null);
  const four = useRef(null);
  const five = useRef(null);
  const six = useRef(null);

 

  const handleSignupClick = () => {
    navigate("/signup/account");
  };

 


 useGSAP(() => {
  const tl = gsap.timeline();

  tl.from(one.current, { opacity: 0, y: 30, duration: 0.5 })
    .from(two.current, {  scale: 2, duration:1,opacity: 0, ease:"elastic.out(1, 0.75)"})
    .from(three.current, { opacity: 0, y: -30, duration: 0.5 })
    .from(four.current, { opacity: 0, y: 30, duration: 0.5 })
    .from(five.current, { scale:0,ease:"elastic.out(1, 0.75)" })
    .from(six.current, { opacity: 0, y: 30, duration: 0.5 });

  return () => tl.kill();
}, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Logo/Brand area */}
        <div ref={one}
        className="mb-8">
          <div className="inline-block">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-primary-500 flex items-center justify-center mb-6">
              <span className="text-3xl font-bold text-white">✓</span>
            </div>
          </div>
        </div>

        {/* Main heading */}
        <h1 ref={two} className={`${FONT_STYLES.display} text-white mb-4`}>
          Welcome to <span className="bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text text-transparent">TaskFlow</span>
        </h1>

        {/* Subheading */}
        <p ref={three} className={`${FONT_STYLES.h3} text-primary-100 mb-8 max-w-xl mx-auto leading-relaxed`}>
          Your personal workflow management platform. Organize, prioritize, and accomplish your goals with ease.
        </p>

        {/* Description */}
        <div ref={four} className="mb-12 space-y-3">
          <p className={`${FONT_STYLES.bodyLg} text-accent-100`}>
            ✨ Seamless task management
          </p>
          <p className={`${FONT_STYLES.bodyLg} text-accent-100`}>
            🎯 Stay focused on what matters
          </p>
          <p className={`${FONT_STYLES.bodyLg} text-accent-100`}>
            🚀 Achieve more every day
          </p>
        </div>

        {/* CTA Button */}
        <button
         ref={five}
          onClick={handleSignupClick}
          className="px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500 text-white font-semibold rounded-lg  shadow-lg hover:shadow-2xl inline-block mb-8"
        >
          Get Started
        </button>

        {/* Secondary text */}
        <p ref={six}
        className={`${FONT_STYLES.bodySm} text-secondary-300`}>
          Join thousands of users managing their tasks efficiently
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-30"></div>
    </div>
  );
};
