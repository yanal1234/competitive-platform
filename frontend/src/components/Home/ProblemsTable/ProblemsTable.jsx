import React from 'react';
import './ProblemsTable.css';
import { ArrowRight, CheckCircle2, Clock, CircleDot } from 'lucide-react';
import { Link } from "react-router-dom";
import { problems } from '../../../data/ProblemsTable';

export default function ProblemsTable() {
  const renderStatus = (status) => {
    const s = status.toLowerCase();
    if (s === 'passed' || s === 'solved') {
      return (
        <span className="status-badge status-passed">
          <CheckCircle2 size={14} />
          <span>Passed</span>
        </span>
      );
    }
    if (s === 'attempted') {
      return (
        <span className="status-badge status-attempted">
          <Clock size={14} />
          <span>Attempted</span>
        </span>
      );
    }
    return (
      <span className="status-badge status-unsolved">
        <CircleDot size={14} />
        <span>Unsolved</span>
      </span>
    );
  };

  return (
    <div className='problems-section'>
      <div className='problems-header'>
        <div>
          <span className='section-badge-small'>SKILL TRACKING</span>
          <h2 className='problems-title'>
            Practice. Submit. <span className='purple-text'>Improve.</span>
          </h2>
        </div>
        <Link to="/problems" className="view-all-btn">
          <span>View all problems</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className='table-container'>
        <table className='problems-table'>
          <thead>
            <tr>
              <th>PROBLEM NAME</th>
              <th>TAGS</th>
              <th>DIFFICULTY</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((prob, index) => {
              return (
                <tr key={prob.id || index}>
                  <td className='prob-name'>
                    {prob.name}
                  </td>
                  <td>
                    <div className='tags-group'>
                      {prob.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className='tag-badge'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`diff-badge diff-${prob.difficulty.toLowerCase()}`}>
                      {prob.difficulty}
                    </span>
                  </td>
                  <td>
                    {renderStatus(prob.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
