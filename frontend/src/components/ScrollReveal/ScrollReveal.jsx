import "./ScrollReveal.css";
import { useEffect, useRef, useState } from "react";

function ScrollReveal({ children, animation = "up" }) {
  const boxRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    },
      {
        threshold: 0.2
      }
    );
    observer.observe(boxRef.current);
    return () => observer.disconnect();
  }, [])


  return (
    <div className={`scroll-reveal ${animation} ${visible ? "show" : ""}`} ref={boxRef}>
      {children}
    </div>
  );
}

export default ScrollReveal;
