import {
  Target,
  BarChart3,
  Route,
  Trophy,
  ArrowRight
} from 'lucide-react';

import { getDashboard } from "../../../services/dashboard";
import './FeatureCards.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCards() {
  const [stats, setStats] = useState({
    priorityProblems: 0,
    skillsMeasured: 0,
    remainingStages: 0,
    activeCoders: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard();
        setStats(response.data)
      }
      catch (error) {
        setError("Failed to load dashboard.");
      }
    }
    loadDashboard();
  }, []);

  const features = [
    {
      tag: 'AI-POWERED',
      icon: Target,
      title: 'Smart Recommendations',
      description:
        'Your submission history becomes a focused problem queue, ranked by the skills most likely to move your rating.',
      statNumber: stats.priorityProblems,
      statText: 'priority problems ready',
      path: "/my-profile"
    },

    {
      tag: 'LIVE ANALYTICS',
      icon: BarChart3,
      title: 'Skill Tracking',
      description:
        'Topic-level graphs expose strengths, weak spots, and pace so every practice session has a measurable purpose.',
      statNumber: stats.skillsMeasured,
      statText: 'skills measured continuously',
      path: "/my-profile"
    },

    {
      tag: 'PERSONALIZED',
      icon: Route,
      title: 'AI Roadmaps',
      description:
        'Structured weekly plans adapt to your current level, target rank, available time, and performance after every solve.',
      statNumber: stats.remainingStages,
      statText: 'roadmap stages remaining',
      path: "/roadmap"
    },

    {
      tag: 'GLOBAL',
      icon: Trophy,
      title: 'Real Competitions',
      description:
        'Timed contests, verified standings, and live leaderboards turn training into pressure-tested competitive skill.',
      statNumber: stats.activeCoders,
      statText: 'active competitive coders',
      path: "/leaderboard"
    },
  ];


  return (
    <div className='cards-wrapper'>
      <div className='section-header'>
        <span className='section-badge'>THE CODEFORGE ADVANTAGE</span>
        <h1 className='section-title'>
          Train smarter. <span className='highlight-text'>Compete sharper.</span>
        </h1>
        <p className='section-subtitle'>
          One connected system turns every submission into a clear next step.
        </p>
      </div>

      <div className='cards-grid'>
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link to={item.path} className="card-link">
              <div key={index} className='card'>
                <div className='card-header'>
                  {/* وضع الأيقونة داخل الكلاس الخاص بها */}
                  <div className='card-icon-box'>
                    <Icon size={18} />
                  </div>
                  <span className='card-badge'>{item.tag}</span>
                </div>

                <div className='card-body'>
                  <h3 className='card-title'>{item.title}</h3>
                  <p className='card-description'>{item.description}</p>
                </div>

                <div className='card-footer'>
                  <p className='card-stat'>
                    <span className='card-stat-number'>{item.statNumber}</span>
                    {item.statText}
                  </p>
                  <button className='card-action-btn' aria-label='View details'>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
