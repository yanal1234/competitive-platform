import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import '../components/FAQ/FAQ.css';
import { faqData } from "../data/FAQ.js"
function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="faq-page-container">
      {/* Header */}
      <div className="faq-header">
        <span className="badge-pill badge-support">SUPPORT</span>

        <h1 className="faq-title">
          Frequently Asked Questions{" "}
          <span className="highlight-purple">FAQs</span>
        </h1>

        <p className="faq-subtitle">
          Everything you need to know about CodeForge AI.
          <br />
          Find answers, understand the platform, and focus on what matters most
          — improving your skills.
        </p>

        {/* Search Bar */}
        <div className="faq-search-wrapper">
          <Search className="faq-search-icon" size={18} />

          <input
            type="text"
            placeholder="Search for a question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faq-search-input"
          />
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="faq-grid">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => (
            <div
              key={faq.id}
              className={`faq-item ${openIndex === idx ? "open" : ""}`}
              onClick={() => toggleAccordion(idx)}
            >
              <div className="faq-question-bar">
                <span className="faq-question-text">
                  {faq.question}
                </span>

                <ChevronDown
                  className="faq-chevron"
                  size={18}
                />
              </div>

              {openIndex === idx && (
                <div className="faq-answer-body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-faq-results">
            <HelpCircle size={32} />
            <p>No matching questions found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FAQ;
