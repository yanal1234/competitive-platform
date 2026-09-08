import {
  Target,
  BarChart3,
  Route,
  Trophy,
  ArrowRight
} from 'lucide-react';

import './FeatureCards.css';

const features = [
  {
    tag: 'AI-POWERED',
    icon: Target,
    title: 'Smart Recommendations',
    description:
      'Your submission history becomes a focused problem queue, ranked by the skills most likely to move your rating.',
    statNumber: '12',
    statText: 'priority problems ready',
  },

  {
    tag: 'LIVE ANALYTICS',
    icon: BarChart3,
    title: 'Skill Tracking',
    description:
      'Topic-level graphs expose strengths, weak spots, and pace so every practice session has a measurable purpose.',
    statNumber: '24',
    statText: 'skills measured continuously',
  },

  {
    tag: 'PERSONALIZED',
    icon: Route,
    title: 'AI Roadmaps',
    description:
      'Structured weekly plans adapt to your current level, target rank, available time, and performance after every solve.',
    statNumber: '6 weeks',
    statText: 'to the next target rank',
  },

  {
    tag: 'GLOBAL',
    icon: Trophy,
    title: 'Real Competitions',
    description:
      'Timed contests, verified standings, and live leaderboards turn training into pressure-tested competitive skill.',
    statNumber: '10K+',
    statText: 'active competitive coders',
  },
];

export default function FeatureCards() {
  return (
    <div className='cards-wrapper'>
      <div className='section-header'>
        <span className='section-badge'>THE CODEFORGE ADVANTAGE</span>
        <h1 className='section-title'>Train smarter. Compete sharper.</h1>
        <p className='section-subtitle'>
          One connected system turns every submission into a clear next step.
        </p>
      </div>
      <div className='cards-grid'>
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className='card'>
              <div className='card-header'>
                <Icon size={24} />
                <span className='card-badge'>{item.tag}</span>
              </div>

              <h3 className='card-title'>{item.title}</h3>
              <p className='card-description'>{item.description}</p>

              <div className='card-footer'>
                <p className='card-stat'>
                  <span className='card-stat-number'>{item.statNumber}</span>
                  {item.statText}
                </p>
                <button className='card-action-btn' aria-label='View details'>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
