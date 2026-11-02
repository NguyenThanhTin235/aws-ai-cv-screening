import React, { useState } from 'react';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MOCK_JOBS: Job[] = [
  {
    id: 'job_001',
    title: 'Senior AWS Cloud & Serverless Architect',
    companyName: 'FinStream Digital Bank',
    companyId: 'comp_finstream_001',
    location: 'TP. Hồ Chí Minh (Hybrid)',
    workType: 'Toàn thời gian',
    level: 'Senior',
    salaryMin: 2500,
    salaryMax: 4000,
    salaryCurrency: 'USD',
    skills: ['AWS Lambda', 'Amazon CDK', 'DynamoDB', 'Step Functions', 'Bedrock AI'],
    description: 'Chịu trách nhiệm thiết kế hệ thống ngân hàng số Serverless không VPC, tích hợp Amazon Bedrock & Claude Haiku cho tự động hóa vận hành.',
    postedAt: 'Hôm nay',
    isVerified: true
  },
  {
    id: 'job_002',
    title: 'Fullstack AI Engineer (React 18 + Node.js)',
    companyName: 'TechVanguard AI Labs',
    companyId: 'comp_techvanguard_002',
    location: 'Hà Nội / Làm từ xa (Remote)',
    workType: 'Làm từ xa (Remote)',
    level: 'Middle',
    salaryMin: 1800,
    salaryMax: 3000,
    salaryCurrency: 'USD',
    skills: ['React 18', 'TypeScript', 'Node.js', 'Amazon Textract', 'LangChain'],
    description: 'Xây dựng giao diện ứng dụng AI thế hệ mới, tối ưu hóa độ trễ phản hồi qua WebSocket Push và bảo vệ quyền riêng tư người dùng.',
    postedAt: '1 ngày trước',
    isVerified: true
  },
  {
    id: 'job_003',
    title: 'DevOps & Cloud Security Specialist',
    companyName: 'CloudSafe Cyber Defense',
    companyId: 'comp_cloudsafe_003',
    location: 'Đà Nẵng (On-site)',
    workType: 'Toàn thời gian',
    level: 'Lead / Architect',
    salaryMin: 2800,
    salaryMax: 4500,
    salaryCurrency: 'USD',
    skills: ['AWS WAF', 'AWS GuardDuty', 'AWS KMS', 'IAM Least Privilege', 'CI/CD'],
    description: 'Bảo vệ chuỗi hạ tầng Cloud trước các cuộc tấn công biên, thiết lập Zero-Trust IAM và chính sách quét mã độc S3 Quarantine tự động.',
    postedAt: '2 ngày trước',
    isVerified: true
  },
  {
    id: 'job_004',
    title: 'Junior Backend Developer (Serverless TS)',
    companyName: 'NextGen Innovate Hub',
    companyId: 'comp_nextgen_004',
    location: 'TP. Hồ Chí Minh',
    workType: 'Toàn thời gian',
    level: 'Junior',
    salaryMin: 800,
    salaryMax: 1400,
    salaryCurrency: 'USD',
    skills: ['TypeScript', 'Node.js', 'REST API', 'Unit Testing', 'DynamoDB'],
    description: 'Tham gia phát triển hệ thống microservices không máy chủ với AWS CDK, xử lý dữ liệu JSON Rubric và ghi nhận Audit Trail.',
    postedAt: '3 ngày trước',
    isVerified: false
  }
];

export const JobBoard: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const matchesKeyword =
      !keyword ||
      job.title.toLowerCase().includes(keyword.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(keyword.toLowerCase())) ||
      job.companyName.toLowerCase().includes(keyword.toLowerCase());

    const matchesLocation =
      selectedLocation === 'All' || job.location.includes(selectedLocation);

    const matchesLevel = selectedLevel === 'All' || job.level === selectedLevel;

    const matchesSkill = !selectedSkill || job.skills.includes(selectedSkill);

    return matchesKeyword && matchesLocation && matchesLevel && matchesSkill;
  });

  const allSkills = Array.from(new Set(MOCK_JOBS.flatMap((j) => j.skills)));

  const handleApply = (_job: Job) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (role === 'candidate') {
      navigate('/candidate');
    } else {
      alert('Tài khoản của bạn là ' + role + '. Vui lòng đăng nhập với tài khoản Ứng viên để nộp đơn!');
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Hero Banner with Integrated Search */}
      <section
        style={{
          background: 'linear-gradient(135deg, #095744 0%, #003e2f 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '40px 32px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '16px'
            }}
          >
            <span>✨ AI-Powered Career Platform</span>
            <span>• Claude Haiku 4.5 &amp; Textract OCR</span>
          </div>

          <h1
            style={{
              fontSize: '32px',
              fontWeight: '800',
              lineHeight: 1.25,
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}
          >
            Khám phá Cơ hội Công nghệ &amp; Đánh giá CV Khách quan cùng AI
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '28px',
              lineHeight: 1.6
            }}
          >
            Hệ thống sàng lọc chuẩn hóa 6 bước: trích xuất text tự động, khử PII bảo vệ quyền riêng tư, và chấm điểm Rubric 100đ minh bạch không thiên vị.
          </p>

          {/* Search Controls */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '8px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
            }}
          >
            <div style={{ flex: '1 1 280px', display: 'flex', alignItems: 'center', padding: '0 12px' }}>
              <span style={{ marginRight: '8px', fontSize: '18px' }}>🔍</span>
              <input
                type="text"
                placeholder="Vị trí, kỹ năng: AWS, React, TypeScript..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  color: 'var(--color-on-surface)'
                }}
              />
            </div>

            <div
              style={{
                flex: '0 1 180px',
                borderLeft: '1px solid var(--color-outline-variant)',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-on-surface)',
                  cursor: 'pointer'
                }}
              >
                <option value="All">Tất cả địa điểm</option>
                <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
                <option value="Remote">Làm từ xa (Remote)</option>
              </select>
            </div>

            <button
              onClick={() => {}}
              style={{
                backgroundColor: 'var(--color-primary-container)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Tìm kiếm việc làm
            </button>
          </div>
        </div>
      </section>

      {/* Main 2-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        {/* Left Filter Sidebar */}
        <aside
          style={{
            backgroundColor: 'var(--color-surface-container-lowest)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-outline-variant)',
            padding: '20px',
            height: 'fit-content',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--color-outline-variant)'
            }}
          >
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--color-on-surface)' }}>
              Bộ lọc nâng cao
            </h3>
            {(selectedLocation !== 'All' || selectedLevel !== 'All' || selectedSkill !== null || keyword) && (
              <button
                onClick={() => {
                  setSelectedLocation('All');
                  setSelectedLevel('All');
                  setSelectedSkill(null);
                  setKeyword('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-error)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Đặt lại
              </button>
            )}
          </div>

          {/* Level Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
              Cấp bậc kinh nghiệm
            </label>
            {(['All', 'Junior', 'Middle', 'Senior', 'Lead / Architect'] as const).map((lvl) => (
              <label
                key={lvl}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--color-on-surface-variant)',
                  marginBottom: '6px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="level"
                  checked={selectedLevel === lvl}
                  onChange={() => setSelectedLevel(lvl)}
                  style={{ accentColor: 'var(--color-primary-container)' }}
                />
                <span>{lvl === 'All' ? 'Tất cả cấp bậc' : lvl}</span>
              </label>
            ))}
          </div>

          {/* Popular Skill Badges */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>
              Kỹ năng công nghệ
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {allSkills.map((sk) => {
                const active = selectedSkill === sk;
                return (
                  <button
                    key={sk}
                    onClick={() => setSelectedSkill(active ? null : sk)}
                    style={{
                      border: '1px solid',
                      borderColor: active ? 'var(--color-primary-container)' : 'var(--color-outline-variant)',
                      backgroundColor: active ? 'var(--color-primary-container)' : 'var(--color-surface-container-low)',
                      color: active ? '#ffffff' : 'var(--color-on-surface-variant)',
                      fontSize: '11px',
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-full)',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Job Cards Grid */}
        <main>
          {/* Header result count */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}
          >
            <p style={{ fontSize: '14px', color: 'var(--color-on-surface-variant)' }}>
              Tìm thấy <strong style={{ color: 'var(--color-primary)' }}>{filteredJobs.length}</strong> việc làm phù hợp
            </p>
            <div style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
              Chấm điểm tự động qua Amazon Bedrock Rubric 100đ
            </div>
          </div>

          {/* Job Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                style={{
                  backgroundColor: 'var(--color-surface-container-lowest)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-outline-variant)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-surface-container)',
                        color: 'var(--color-primary-container)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '18px'
                      }}
                    >
                      {job.companyName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--color-outline)', fontWeight: '600' }}>
                          {job.companyName}
                        </span>
                        {job.isVerified && (
                          <span
                            title="Doanh nghiệp đã xác thực hạ tầng AWS"
                            style={{
                              fontSize: '11px',
                              backgroundColor: '#e6f4ea',
                              color: '#137333',
                              padding: '2px 6px',
                              borderRadius: 'var(--radius-full)',
                              fontWeight: '600'
                            }}
                          >
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-on-surface)', marginTop: '2px' }}>
                        {job.title}
                      </h2>
                    </div>
                  </div>

                  {/* Salary Highlight */}
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: '17px',
                        fontWeight: '800',
                        color: '#059669',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      ${job.salaryMin} - ${job.salaryMax}
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--color-outline)' }}>
                      {job.workType}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '13.5px', color: 'var(--color-on-surface-variant)', lineHeight: 1.55 }}>
                  {job.description}
                </p>

                {/* Skills Badges and Quick Apply */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '8px',
                    borderTop: '1px solid var(--color-surface-container)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {job.skills.map((sk) => (
                      <span
                        key={sk}
                        style={{
                          backgroundColor: 'var(--color-surface-container-low)',
                          color: 'var(--color-on-surface-variant)',
                          fontSize: '12px',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--color-outline-variant)'
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-outline)' }}>
                      📍 {job.location}
                    </span>
                    <button
                      onClick={() => handleApply(job)}
                      style={{
                        backgroundColor: 'var(--color-primary-container)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '8px 18px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      ỨNG TUYỂN NGAY
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

