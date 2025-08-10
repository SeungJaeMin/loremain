import { useState } from 'react';

function RecruitPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobCategories = [
    { id: 'all', name: 'All Jobs', count: 12 },
    { id: 'engineering', name: 'Engineering', count: 5 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'marketing', name: 'Marketing', count: 2 },
    { id: 'content', name: 'Content', count: 2 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'Suwon', name: 'Suwon, KR' },
    { id: 'remote', name: 'Remote' }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Game Designer',
      department: 'Game Design',
      location: 'Suwon, KR',
      type: 'Full-time',
      category: 'design',
      tags: ['TCG', 'Game Balance', 'Systems Design'],
      description: 'Design and iterate on core gameplay systems for our upcoming TCG project.',
      isNew: true
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      department: 'Engineering',
      location: 'Suwon, KR',
      type: 'Full-time',
      category: 'engineering',
      tags: ['React', 'TypeScript', 'Web3'],
      description: 'Build responsive and interactive web applications for our gaming platform.',
      isNew: false
    },
    {
      id: 3,
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      category: 'engineering',
      tags: ['Java', 'Spring', 'Microservices'],
      description: 'Develop scalable server architecture and APIs for our gaming ecosystem.',
      isNew: true
    },
    {
      id: 4,
      title: 'Art Director',
      department: 'Art & Design',
      location: 'Suwon, KR',
      type: 'Full-time',
      category: 'design',
      tags: ['Illustration', 'Visual Design', 'Team Leadership'],
      description: 'Lead the visual direction and art style for our card game and digital content.',
      isNew: false
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      category: 'engineering',
      tags: ['AWS', 'Docker', 'Kubernetes'],
      description: 'Manage cloud infrastructure and deployment pipelines for our gaming services.',
      isNew: false
    },
    {
      id: 6,
      title: 'Community Manager',
      department: 'Marketing',
      location: 'Suwon, KR',
      type: 'Full-time',
      category: 'marketing',
      tags: ['Social Media', 'Community Building', 'Content Creation'],
      description: 'Build and engage with our gaming community across various platforms.',
      isNew: true
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const categoryMatch = selectedCategory === 'all' || job.category === selectedCategory;
    const locationMatch = selectedLocation === 'all' || job.location.includes(selectedLocation === 'Suwon' ? 'Suwon' : selectedLocation === 'remote' ? 'Remote' : '');
    return categoryMatch && locationMatch;
  });

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Join Our Quest</h1>
          <p className="hero-subtitle">
            Build the future of entertainment with passionate creators, innovative thinkers, 
            and talented developers at LORECRAFT.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{jobs.length}</span>
              <span className="stat-label">Open Positions</span>
            </div>
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">Departments</span>
            </div>
            <div className="stat">
              <span className="stat-number">2</span>
              <span className="stat-label">Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="careers-container">
        {/* Filters */}
        <section className="filters-section">
          <div className="filters-content">
            <div className="filter-group">
              <h3>Department</h3>
              <div className="filter-buttons">
                {jobCategories.map(category => (
                  <button
                    key={category.id}
                    className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h3>Location</h3>
              <div className="filter-buttons">
                {locations.map(location => (
                  <button
                    key={location.id}
                    className={`filter-btn ${selectedLocation === location.id ? 'active' : ''}`}
                    onClick={() => setSelectedLocation(location.id)}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="jobs-section">
          <div className="jobs-header">
            <h2>Open Positions</h2>
            <p className="jobs-count">{filteredJobs.length} positions found</p>
          </div>

          <div className="jobs-grid">
            {filteredJobs.map(job => (
              <div key={job.id} className="job-card">
                {job.isNew && <div className="new-badge">NEW</div>}
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-department">{job.department}</span>
                    <span className="job-location">📍 {job.location}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                </div>
                
                <p className="job-description">{job.description}</p>
                
                <div className="job-tags">
                  {job.tags.map(tag => (
                    <span key={tag} className="job-tag">{tag}</span>
                  ))}
                </div>

                <button className="apply-btn">
                  Apply Now
                  <span className="apply-arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <h2>Why Join LORECRAFT?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💡</div>
              <h3>Innovation First</h3>
              <p>Work on cutting-edge projects that push the boundaries of entertainment technology.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌍</div>
              <h3>Remote Friendly</h3>
              <p>Flexible work arrangements with options for remote work and hybrid schedules.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🚀</div>
              <h3>Growth Focused</h3>
              <p>Continuous learning opportunities, mentorship programs, and career development.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎮</div>
              <h3>Gaming Culture</h3>
              <p>Work with passionate gamers who understand and love what they create.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Competitive Package</h3>
              <p>Attractive salary, equity options, health benefits, and performance bonuses.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🏆</div>
              <h3>Impact & Recognition</h3>
              <p>Your contributions matter and are recognized in our collaborative environment.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Level Up Your Career?</h2>
            <p>Don't see a position that fits? We're always interested in hearing from talented individuals.</p>
            <div className="cta-buttons">
              <button className="cta-primary">View All Jobs</button>
              <button className="cta-secondary">Send Us Your Resume</button>
            </div>
            <div className="contact-info">
              <p>Questions? Reach out to us at <a href="mailto:careers@lorecraft.com">careers@lorecraft.com</a></p>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .careers-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          color: white;
        }

        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 120px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          opacity: 0.1;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 24px;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          margin-bottom: 40px;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 50px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: #fff;
        }

        .stat-label {
          font-size: 1rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .careers-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .filters-section {
          padding: 60px 0 50px;
          border-bottom: 1px solid #333;
        }

        .filters-content {
          display: flex;
          gap: 60px;
          flex-wrap: wrap;
        }

        .filter-group h3 {
          font-size: 1rem;
          margin-bottom: 16px;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .filter-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 16px;
          border: 2px solid #444;
          background: #2a2a2a;
          color: #ccc;
          border-radius: 25px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .filter-btn:hover {
          border-color: #667eea;
          color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
        }

        .jobs-section {
          padding: 60px 0;
        }

        .jobs-header {
          margin-bottom: 40px;
        }

        .jobs-header h2 {
          font-size: 2.5rem;
          margin-bottom: 12px;
          font-weight: 800;
          color: white;
        }

        .jobs-count {
          color: #999;
          font-size: 1.1rem;
        }

        .jobs-grid {
          display: grid;
          gap: 24px;
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
        }

        .job-card {
          background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
          border: 1px solid #333;
          border-radius: 16px;
          padding: 32px;
          position: relative;
          transition: all 0.3s ease;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .job-card:hover {
          transform: translateY(-8px);
          border-color: #667eea;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(102, 126, 234, 0.1);
        }

        .new-badge {
          position: absolute;
          top: -1px;
          right: 20px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a52);
          color: white;
          padding: 6px 12px;
          border-radius: 0 0 8px 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .job-header {
          margin-bottom: 20px;
        }

        .job-title {
          font-size: 1.4rem;
          margin-bottom: 12px;
          font-weight: 700;
          color: white;
        }

        .job-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.9rem;
          color: #999;
        }

        .job-department {
          color: #667eea;
          font-weight: 600;
        }

        .job-description {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 1rem;
        }

        .job-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .job-tag {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .apply-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          justify-content: center;
          font-size: 1rem;
        }

        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .apply-arrow {
          transition: transform 0.3s ease;
        }

        .apply-btn:hover .apply-arrow {
          transform: translateX(4px);
        }

        .benefits-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          margin: 60px -20px 0;
        }

        .benefits-section h2 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 60px;
          font-weight: 800;
          color: white;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .benefit-card {
          text-align: center;
          padding: 40px 24px;
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          border: 1px solid #444;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }

        .benefit-icon {
          font-size: 3rem;
          margin-bottom: 20px;
        }

        .benefit-card h3 {
          font-size: 1.3rem;
          margin-bottom: 16px;
          font-weight: 700;
          color: white;
        }

        .benefit-card p {
          color: #ccc;
          line-height: 1.6;
          font-size: 1rem;
        }

        .cta-section {
          padding: 80px 0;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 800;
          color: white;
        }

        .cta-content p {
          font-size: 1.1rem;
          color: #999;
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .cta-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .cta-secondary {
          background: #2a2a2a;
          color: #667eea;
          border: 2px solid #667eea;
          padding: 16px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .cta-secondary:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .contact-info {
          color: #999;
        }

        .contact-info a {
          color: #667eea;
          text-decoration: none;
        }

        .contact-info a:hover {
          text-decoration: underline;
        }

      `}</style>
    </div>
  );
}

export default RecruitPage;