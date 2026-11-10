import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/job-board.css';
import {
  SearchIcon,
  MapPinIcon,
  SparklesIcon,
  ArrowRightIcon,
  TrendingUpIcon,
  SlidersIcon,
  HeartIcon,
  DollarSignIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentScannerIcon,
  UploadIcon,
  XIcon
} from '../components/common/Icons';

import { ALL_JOBS, DetailedJob } from '../data/jobsData';
import { api } from '../services/api';
import { CompanyAvatar } from '../components/common/CompanyAvatar';
export type { DetailedJob };

interface ProvinceData {
  id: string;
  name: string;
  districts: string[]; // Tỉnh, Quận/huyện cũ
  wards_after_2025: string[]; // Tỉnh, Phường/xã sau 1/7/2025 (Mới)
}

const VIETNAM_PROVINCES: ProvinceData[] = [
  {
    id: 'hn',
    name: 'Hà Nội',
    districts: [
      'Cầu Giấy',
      'Ba Đình',
      'Đống Đa',
      'Hoàn Kiếm',
      'Hai Bà Trưng',
      'Nam Từ Liêm',
      'Bắc Từ Liêm',
      'Thanh Xuân',
      'Hà Đông',
      'Long Biên',
      'Hoàng Mai',
      'Tây Hồ',
      'Huyện Gia Lâm',
      'Huyện Đông Anh',
      'Huyện Hoài Đức',
      'Huyện Thanh Trì',
      'Huyện Thạch Thất'
    ],
    wards_after_2025: [
      'Phường Dịch Vọng Hậu (Cầu Giấy)',
      'Phường Dịch Vọng (Cầu Giấy)',
      'Phường Trung Hòa (Cầu Giấy)',
      'Phường Yên Hòa (Cầu Giấy)',
      'Phường Mai Dịch (Cầu Giấy)',
      'Phường Nghĩa Đô (Cầu Giấy)',
      'Phường Mễ Trì (Nam Từ Liêm)',
      'Phường Mỹ Đình 1 (Nam Từ Liêm)',
      'Phường Mỹ Đình 2 (Nam Từ Liêm)',
      'Phường Trung Văn (Nam Từ Liêm)',
      'Phường Cổ Nhuế 1 (Bắc Từ Liêm)',
      'Phường Cổ Nhuế 2 (Bắc Từ Liêm)',
      'Phường Tràng Tiền (Hoàn Kiếm)',
      'Phường Hàng Bạc (Hoàn Kiếm)',
      'Phường Hàng Bài (Hoàn Kiếm)',
      'Phường Điện Biên (Ba Đình)',
      'Phường Kim Mã (Ba Đình)',
      'Phường Liễu Giai (Ba Đình)',
      'Phường Giảng Võ (Ba Đình)',
      'Phường Láng Hạ (Đống Đa)',
      'Phường Cát Linh (Đống Đa)',
      'Phường Ô Chợ Dừa (Đống Đa)',
      'Phường Nhân Chính (Thanh Xuân)',
      'Phường Khương Mai (Thanh Xuân)',
      'Phường Bách Khoa (Hai Bà Trưng)',
      'Phường Đồng Tâm (Hai Bà Trưng)',
      'Phường Mộ Lao (Hà Đông)',
      'Phường Vạn Phúc (Hà Đông)',
      'Phường Hoàng Liệt (Hoàng Mai)',
      'Phường Bồ Đề (Long Biên)',
      'Phường Quảng An (Tây Hồ)'
    ]
  },
  {
    id: 'hcm',
    name: 'Hồ Chí Minh',
    districts: [
      'Quận 1',
      'Quận 3',
      'Quận 4',
      'Quận 5',
      'Quận 6',
      'Quận 7',
      'Quận 8',
      'Quận 10',
      'Quận 11',
      'Quận 12',
      'Thành phố Thủ Đức',
      'Bình Thạnh',
      'Tân Bình',
      'Tân Phú',
      'Phú Nhuận',
      'Gò Vấp',
      'Bình Tân',
      'Huyện Hóc Môn',
      'Huyện Củ Chi',
      'Huyện Bình Chánh',
      'Huyện Nhà Bè',
      'Huyện Cần Giờ'
    ],
    wards_after_2025: [
      'Phường Bến Nghé (Quận 1)',
      'Phường Bến Thành (Quận 1)',
      'Phường Đa Kao (Quận 1)',
      'Phường Tân Định (Quận 1)',
      'Phường Cầu Kho (Quận 1)',
      'Phường Cầu Ông Lãnh (Quận 1)',
      'Phường Võ Thị Sáu (Quận 3)',
      'Phường 9 (Quận 3)',
      'Phường 11 (Quận 3)',
      'Phường Thảo Điền (TP. Thủ Đức)',
      'Phường An Khánh (TP. Thủ Đức)',
      'Phường Thủ Thiêm (TP. Thủ Đức)',
      'Phường Hiệp Bình Chánh (TP. Thủ Đức)',
      'Phường Hiệp Bình Phước (TP. Thủ Đức)',
      'Phường Linh Trung (TP. Thủ Đức)',
      'Phường Tăng Nhơn Phú A (TP. Thủ Đức)',
      'Phường Tăng Nhơn Phú B (TP. Thủ Đức)',
      'Phường Trường Thọ (TP. Thủ Đức)',
      'Phường Tân Phong (Quận 7)',
      'Phường Tân Phú (Quận 7)',
      'Phường Tân Thuận Đông (Quận 7)',
      'Phường 25 (Bình Thạnh)',
      'Phường 14 (Bình Thạnh)',
      'Phường 2 (Tân Bình)',
      'Phường 12 (Tân Bình)',
      'Phường 15 (Tân Bình)',
      'Phường 2 (Phú Nhuận)',
      'Phường 7 (Phú Nhuận)',
      'Phường 1 (Gò Vấp)',
      'Phường 10 (Gò Vấp)',
      'Phường An Lạc (Bình Tân)',
      'Xã Phước Kiển (Nhà Bè)',
      'Xã Tân Kiên (Bình Chánh)',
      'Xã Vĩnh Lộc A (Bình Chánh)'
    ]
  },
  {
    id: 'bn',
    name: 'Bắc Ninh',
    districts: [
      'Thành phố Bắc Ninh',
      'Từ Sơn',
      'Yên Phong',
      'Quế Võ',
      'Tiên Du',
      'Thuận Thành'
    ],
    wards_after_2025: [
      'Phường Suối Hoa (TP. Bắc Ninh)',
      'Phường Tiền An (TP. Bắc Ninh)',
      'Phường Ninh Xá (TP. Bắc Ninh)',
      'Phường Kinh Bắc (TP. Bắc Ninh)',
      'Phường Đại Phúc (TP. Bắc Ninh)',
      'Phường Đồng Kỵ (Từ Sơn)',
      'Phường Trang Hạ (Từ Sơn)',
      'Phường Phù Chẩn (Từ Sơn)',
      'Phường Phương Liễu (Quế Võ)',
      'Xã Yên Trung (Yên Phong)',
      'Xã Đông Phong (Yên Phong)'
    ]
  },
  {
    id: 'dnai',
    name: 'Đồng Nai',
    districts: [
      'Thành phố Biên Hòa',
      'Long Thành',
      'Nhơn Trạch',
      'Trảng Bom',
      'Vĩnh Cửu'
    ],
    wards_after_2025: [
      'Phường Quyết Thắng (TP. Biên Hòa)',
      'Phường Trung Dũng (TP. Biên Hòa)',
      'Phường Thống Nhất (TP. Biên Hòa)',
      'Phường Tân Phong (TP. Biên Hòa)',
      'Phường Long Bình (TP. Biên Hòa)',
      'Phường Trảng Dài (TP. Biên Hòa)',
      'Xã Long Đức (Long Thành)',
      'Xã An Phước (Long Thành)',
      'Xã Hiệp Phước (Nhơn Trạch)',
      'Xã Phú Hội (Nhơn Trạch)'
    ]
  },
  {
    id: 'hy',
    name: 'Hưng Yên',
    districts: [
      'Thành phố Hưng Yên',
      'Văn Giang (Ecopark)',
      'Văn Lâm',
      'Mỹ Hào',
      'Yên Mỹ'
    ],
    wards_after_2025: [
      'Phường Hiến Nam (TP. Hưng Yên)',
      'Phường Lam Sơn (TP. Hưng Yên)',
      'Phường An Tảo (TP. Hưng Yên)',
      'Xã Phụng Công (Văn Giang)',
      'Xã Cửu Cao (Văn Giang)',
      'Xã Xuân Quan (Văn Giang)',
      'Xã Như Quỳnh (Văn Lâm)',
      'Phường Bần Yên Nhân (Mỹ Hào)'
    ]
  },
  {
    id: 'dn',
    name: 'Đà Nẵng',
    districts: [
      'Hải Châu',
      'Thanh Khê',
      'Sơn Trà',
      'Ngũ Hành Sơn',
      'Liên Chiểu',
      'Cẩm Lệ',
      'Huyện Hòa Vang'
    ],
    wards_after_2025: [
      'Phường Hải Châu 1 (Hải Châu)',
      'Phường Hải Châu 2 (Hải Châu)',
      'Phường Thạch Thang (Hải Châu)',
      'Phường Thuận Phước (Hải Châu)',
      'Phường Vĩnh Trung (Thanh Khê)',
      'Phường Tam Thuận (Thanh Khê)',
      'Phường An Hải Bắc (Sơn Trà)',
      'Phường Phước Mỹ (Sơn Trà)',
      'Phường Mỹ An (Ngũ Hành Sơn)',
      'Phường Khuê Mỹ (Ngũ Hành Sơn)',
      'Phường Hòa Minh (Liên Chiểu)',
      'Phường Hòa Khánh Bắc (Liên Chiểu)',
      'Phường Khuê Trung (Cẩm Lệ)',
      'Phường Hòa Thọ Đông (Cẩm Lệ)'
    ]
  },
  {
    id: 'hp',
    name: 'Hải Phòng',
    districts: [
      'Hồng Bàng',
      'Ngô Quyền',
      'Lê Chân',
      'Hải An',
      'Dương Kinh',
      'Huyện Thủy Nguyên'
    ],
    wards_after_2025: [
      'Phường Hoàng Văn Thụ (Hồng Bàng)',
      'Phường Phan Bội Châu (Hồng Bàng)',
      'Phường Máy Tơ (Ngô Quyền)',
      'Phường Cầu Đất (Ngô Quyền)',
      'Phường An Dương (Lê Chân)',
      'Phường Đằng Hải (Hải An)'
    ]
  },
  {
    id: 'bd',
    name: 'Bình Dương',
    districts: [
      'Thủ Dầu Một',
      'Dĩ An',
      'Thuận An',
      'Bến Cát',
      'Tân Uyên',
      'Bàu Bàng'
    ],
    wards_after_2025: [
      'Phường Phú Cường (Thủ Dầu Một)',
      'Phường Phú Hòa (Thủ Dầu Một)',
      'Phường Hiệp Thành (Thủ Dầu Một)',
      'Phường Chánh Nghĩa (Thủ Dầu Một)',
      'Phường Dĩ An (Dĩ An)',
      'Phường An Bình (Dĩ An)',
      'Phường Đông Hòa (Dĩ An)',
      'Phường Lái Thiêu (Thuận An)',
      'Phường An Phú (Thuận An)',
      'Phường Thuận Giao (Thuận An)',
      'Phường Mỹ Phước (Bến Cát)'
    ]
  },
  {
    id: 'ct',
    name: 'Cần Thơ',
    districts: [
      'Ninh Kiều',
      'Cái Răng',
      'Bình Thủy',
      'Ô Môn',
      'Thốt Nốt'
    ],
    wards_after_2025: [
      'Phường Tân An (Ninh Kiều)',
      'Phường An Cư (Ninh Kiều)',
      'Phường An Phú (Ninh Kiều)',
      'Phường Hưng Phú (Cái Răng)',
      'Phường Lê Bình (Cái Răng)',
      'Phường Bình Thủy (Bình Thủy)'
    ]
  }
];

const HOT_KEYWORDS = [
  'AWS',
  'DevOps',
  'Cloud Architect',
  'Kubernetes',
  'Terraform',
  'CI/CD',
  'Intern'
];

const formatLocation = (loc: any, fallback: string): string => {
  if (typeof loc === 'string') return loc;
  if (loc && typeof loc === 'object') {
    if (loc.district && loc.province && loc.ward) {
      return `${loc.district}, ${loc.province} • ${loc.ward}`;
    }
    return loc.fullAddress || loc.province || fallback;
  }
  return fallback;
};

const formatSalaryText = (sal: any, fallback: string): string => {
  if (typeof sal === 'string') return sal;
  if (sal && typeof sal === 'object') {
    return sal.salaryText || (sal.min && sal.max ? `${sal.min} - ${sal.max} triệu / tháng` : fallback);
  }
  return fallback;
};

const mapLevel = (lvl: any, fallback: DetailedJob['level']): DetailedJob['level'] => {
  if (!lvl) return fallback;
  const upper = String(lvl).toUpperCase();
  if (upper === 'INTERN') return 'Intern';
  if (upper === 'JUNIOR' || upper === 'FRESHER') return 'Fresher / Junior';
  if (upper === 'MIDDLE') return 'Middle';
  if (upper === 'SENIOR') return 'Senior Specialist';
  if (upper === 'LEAD' || upper === 'PRINCIPAL') return 'Lead / Principal Architect';
  return fallback;
};

const mapWorkType = (wt: any, fallback: DetailedJob['workType']): DetailedJob['workType'] => {
  if (!wt) return fallback;
  const upper = String(wt).toUpperCase();
  if (upper === 'FULL_TIME') return 'Toàn thời gian';
  if (upper === 'PART_TIME') return 'Bán thời gian';
  if (upper === 'REMOTE') return 'Làm từ xa / Remote';
  if (upper === 'HYBRID') return 'Hybrid linh hoạt';
  return fallback;
};

export const JobBoard: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  // Dynamic Jobs from DynamoDB API with static fallback
  const [jobsList, setJobsList] = useState<DetailedJob[]>(ALL_JOBS);

  useEffect(() => {
    let isMounted = true;
    api.getJobs({ limit: 50 })
      .then((res) => {
        if (isMounted && Array.isArray(res.items) && res.items.length > 0) {
          const mapped: DetailedJob[] = res.items.map((item, idx) => {
            const matched = ALL_JOBS.find((j) => j.id === item.jobId || j.id === item.id) || ALL_JOBS[idx % ALL_JOBS.length];
            return {
              ...matched,
              id: item.jobId || item.id || matched.id || `job_${idx}`,
              title: item.title || matched.title,
              companyName: item.companyName || matched.companyName,
              companyScale: item.companyScale || matched.companyScale,
              location: formatLocation(item.location, matched.location),
              rawLocation: typeof item.location === 'object' ? item.location : matched.rawLocation,
              description: item.description || matched.description,
              skills: Array.isArray(item.skills) && item.skills.length > 0 ? item.skills : matched.skills,
              level: mapLevel(item.level, matched.level),
              workType: mapWorkType(item.workplaceType || item.workType, matched.workType),
              salaryText: formatSalaryText(item.salary, matched.salaryText),
              salaryMin: typeof item.salary === 'object' && item.salary?.min !== undefined ? Number(item.salary.min) : matched.salaryMin,
              salaryMax: typeof item.salary === 'object' && item.salary?.max !== undefined ? Number(item.salary.max) : matched.salaryMax,
              experience: typeof item.experience === 'object' ? (item.experience.experienceText || matched.experience) : (item.experience || matched.experience),
              isVerified: true
            };
          });
          setJobsList(mapped);
        }
      })
      .catch(() => {
        // Fallback to local ALL_JOBS
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Set of applied job IDs / titles for card highlighting
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    if (!isAuthenticated || role !== 'candidate') return [];
    try {
      const saved = localStorage.getItem('candidate_applications');
      if (saved) {
        const apps = JSON.parse(saved);
        if (Array.isArray(apps)) {
          return apps
            .filter((a: any) => a.status !== 'Đã rút đơn' && a.status !== 'WITHDRAWN')
            .flatMap((a: any) => [a.jobId, a.jobTitle, a.id].filter(Boolean));
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    if (!isAuthenticated || role !== 'candidate') {
      setAppliedJobIds([]);
      setBookmarkedIds([]);
      return;
    }

    const checkApplied = () => {
      try {
        const saved = localStorage.getItem('candidate_applications');
        if (saved) {
          const apps = JSON.parse(saved);
          if (Array.isArray(apps)) {
            const ids = apps
              .filter((a: any) => a.status !== 'Đã rút đơn' && a.status !== 'WITHDRAWN')
              .flatMap((a: any) => [a.jobId, a.jobTitle, a.id].filter(Boolean));
            setAppliedJobIds(ids);
          }
        }
      } catch {
        // ignore
      }
    };

    checkApplied();
    window.addEventListener('focus', checkApplied);

    api.getMyApplications()
      .then((items) => {
        if (Array.isArray(items)) {
          const activeIds = items
            .filter((item: any) => item.status !== 'WITHDRAWN' && item.status !== 'Đã rút đơn')
            .flatMap((item: any) => [item.jobId, item.jobTitle, item.applicationId, item.id].filter(Boolean));
          setAppliedJobIds((prev) => Array.from(new Set([...prev, ...activeIds])));
        }
      })
      .catch(() => {});

    return () => {
      window.removeEventListener('focus', checkApplied);
    };
  }, [isAuthenticated, role]);

  // Search & Filter States
  const [keyword, setKeyword] = useState('');

  // Rich Location Picker States
  const [isLocPickerOpen, setIsLocPickerOpen] = useState(false);
  const [locSearchMode, setLocSearchMode] = useState<'after_2025' | 'legacy'>('after_2025');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [focusedProvinceId, setFocusedProvinceId] = useState<string | null>('hcm');
  const [provinceQuery, setProvinceQuery] = useState('');
  const [districtQuery, setDistrictQuery] = useState('');
  const locPickerRef = useRef<HTMLDivElement>(null);

  // Close location picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        locPickerRef.current &&
        !locPickerRef.current.contains(event.target as Node)
      ) {
        setIsLocPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleLocation = (locName: string) => {
    if (selectedLocations.includes(locName)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== locName));
    } else {
      setSelectedLocations([...selectedLocations, locName]);
    }
  };

  const handleSelectProvinceRow = (provId: string) => {
    setFocusedProvinceId(provId);
    setDistrictQuery('');
  };

  const handleToggleProvince = (provName: string, provId: string) => {
    setFocusedProvinceId(provId);
    setDistrictQuery('');

    const isAlreadySelected = selectedLocations.includes(provName);

    if (isAlreadySelected) {
      // Uncheck this province & its districts/wards
      const provObj = VIETNAM_PROVINCES.find((p) => p.id === provId);
      const newSelected = selectedLocations.filter((loc) => {
        if (!provObj) return loc !== provName;
        return (
          loc !== provName &&
          !provObj.districts.includes(loc) &&
          !provObj.wards_after_2025.includes(loc)
        );
      });
      setSelectedLocations(newSelected);

      // If exactly 1 remaining province is selected, switch focus to it
      const remainingProvinces = VIETNAM_PROVINCES.filter(
        (p) => p.id !== provId && newSelected.includes(p.name)
      );
      if (remainingProvinces.length === 1) {
        setFocusedProvinceId(remainingProvinces[0].id);
      }
    } else {
      // Check this province
      const newSelected = [...selectedLocations, provName];
      const newSelectedProvinces = VIETNAM_PROVINCES.filter((p) =>
        newSelected.includes(p.name)
      );
      // If multiple provinces are selected, clear all sub-district/ward selections
      if (newSelectedProvinces.length > 1) {
        const provinceNamesOnly = newSelected.filter((loc) =>
          VIETNAM_PROVINCES.some((p) => p.name === loc)
        );
        setSelectedLocations(provinceNamesOnly);
      } else {
        setSelectedLocations(newSelected);
      }
    }
  };

  const handleClearAllLocations = () => {
    setSelectedLocations([]);
  };

  const handleApplyLocations = () => {
    setIsLocPickerOpen(false);
  };

  // Work Mode filter states
  const [workModes, setWorkModes] = useState<Record<string, boolean>>({
    'Toàn thời gian': true,
    'Bán thời gian': false,
    'Làm từ xa / Remote': true,
    'Hybrid linh hoạt': false
  });

  // Seniority filter states
  const [levels, setLevels] = useState<Record<string, boolean>>({
    Intern: false,
    'Fresher / Junior': false,
    Middle: true,
    'Senior Specialist': true,
    'Lead / Principal Architect': false
  });

  // Skill Pills
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['AWS', 'Docker']);
  const availableSkills = [
    'AWS',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Node.js',
    'Python',
    'React',
    'Serverless'
  ];

  // Salary Filter States (in Triệu VND, tối thiểu 1 triệu)
  const [salaryRange, setSalaryRange] = useState<[number, number]>([1, 100]);
  const [includeNegotiable, setIncludeNegotiable] = useState(true);

  // Sort State
  const [sortBy, setSortBy] = useState('ai-best');

  // Pagination State (8 jobs per page)
  const JOBS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Bookmarked Jobs (synced with localStorage saved_job_ids)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (!isAuthenticated || role !== 'candidate') return [];
    try {
      const stored = localStorage.getItem('saved_job_ids');
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  useEffect(() => {
    if (!isAuthenticated || role !== 'candidate') {
      setBookmarkedIds([]);
    } else {
      try {
        const stored = localStorage.getItem('saved_job_ids');
        if (stored) {
          setBookmarkedIds(JSON.parse(stored));
        }
      } catch {}
    }
  }, [isAuthenticated, role]);

  // Rubric Modal State (for viewing AI score details on job cards)
  const [activeRubricJob, setActiveRubricJob] = useState<DetailedJob | null>(null);

  // Auto-reset page to 1 when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, selectedLocations, workModes, levels, salaryRange, includeNegotiable, selectedSkills, sortBy]);

  // Toggle skill selection
  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Toggle bookmark (persisted to localStorage)
  const handleToggleBookmark = (id: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('saved_job_ids', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset filters
  const handleResetFilters = () => {
    setKeyword('');
    setSelectedLocations([]);
    setSalaryRange([1, 100]);
    setIncludeNegotiable(true);
    setWorkModes({
      'Toàn thời gian': false,
      'Bán thời gian': false,
      'Làm từ xa / Remote': false,
      'Hybrid linh hoạt': false
    });
    setLevels({
      Intern: false,
      'Fresher / Junior': false,
      Middle: false,
      'Senior Specialist': false,
      'Lead / Principal Architect': false
    });
    setSelectedSkills([]);
    setCurrentPage(1);
  };

  // Selected provinces count & check
  const selectedProvinces = VIETNAM_PROVINCES.filter((p) =>
    selectedLocations.includes(p.name)
  );
  const hasMultipleProvincesSelected = selectedProvinces.length > 1;

  // Province and district filtering for location picker
  const filteredProvinces = VIETNAM_PROVINCES.filter((p) =>
    p.name.toLowerCase().includes(provinceQuery.toLowerCase().trim())
  );

  const activeProvinceObj = VIETNAM_PROVINCES.find((p) => p.id === focusedProvinceId);

  // If multiple provinces are selected, right pane districts are empty ("để trống huyện")
  const currentSubdivisions =
    hasMultipleProvincesSelected || !activeProvinceObj
      ? []
      : locSearchMode === 'after_2025'
      ? activeProvinceObj.wards_after_2025
      : activeProvinceObj.districts;

  const filteredSubdivisions = currentSubdivisions.filter((item) =>
    item.toLowerCase().includes(districtQuery.toLowerCase().trim())
  );

  // Filter & sort logic
  const filteredJobs = jobsList.filter((job) => {
    // Tokenized Keyword match (splits multiple words and matches across title, company, skills, level, description)
    if (keyword.trim()) {
      const tokens = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const searchableText = [
        job.title,
        job.companyName,
        ...job.skills,
        job.level,
        job.description
      ].join(' ').toLowerCase();

      const matchesAllTokens = tokens.every((token) => searchableText.includes(token));
      if (!matchesAllTokens) return false;
    }

    // Location match
    if (selectedLocations.length > 0) {
      const matchesLocation = selectedLocations.some((loc) => {
        const jobLoc = (typeof job.location === 'string' ? job.location : '').toLowerCase();
        const cleanLoc = loc.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
        const match = loc.match(/\((.*?)\)/);
        const parentDistrict = match ? match[1].toLowerCase() : null;

        return (
          jobLoc.includes(loc.toLowerCase()) ||
          jobLoc.includes(cleanLoc) ||
          (parentDistrict && jobLoc.includes(parentDistrict)) ||
          (cleanLoc.includes('hồ chí minh') && (jobLoc.includes('hcm') || jobLoc.includes('hồ chí minh'))) ||
          (cleanLoc.includes('hà nội') && (jobLoc.includes('hà nội') || jobLoc.includes('hn')))
        );
      });
      if (!matchesLocation) return false;
    }

    // Work Mode
    const selectedModes = Object.entries(workModes)
      .filter(([_, val]) => val)
      .map(([key]) => key);
    if (selectedModes.length > 0 && !selectedModes.includes(job.workType)) {
      return false;
    }

    // Seniority Level
    const selectedLevels = Object.entries(levels)
      .filter(([_, val]) => val)
      .map(([key]) => key);
    if (selectedLevels.length > 0 && !selectedLevels.includes(job.level)) {
      return false;
    }

    // Skill pills (Bắt buộc có ĐỦ tất cả các kỹ năng đã chọn - Điều kiện AND)
    if (selectedSkills.length > 0) {
      const hasAllSkills = selectedSkills.every((s) =>
        job.skills.some((js) => js.toLowerCase().includes(s.toLowerCase()))
      );
      if (!hasAllSkills) return false;
    }

    // Salary range match (in Triệu VND)
    if (job.salaryMin !== undefined && job.salaryMax !== undefined) {
      const inSalaryRange = job.salaryMax >= salaryRange[0] && job.salaryMin <= salaryRange[1];
      if (!inSalaryRange) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'ai-best') {
      return (b.matchScore || 0) - (a.matchScore || 0);
    }
    if (sortBy === 'salary') {
      return b.salaryMax - a.salaryMax;
    }
    return 0;
  });

  // Pagination calculations
  const totalJobs = filteredJobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * JOBS_PER_PAGE;
  const endIndex = Math.min(startIndex + JOBS_PER_PAGE, totalJobs);
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handleApply = (_job: DetailedJob) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (role === 'candidate') {
      navigate('/candidate');
    } else {
      alert(`Tài khoản của bạn là ${role}. Vui lòng đăng nhập với tài khoản Ứng viên để nộp đơn!`);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-surface)', minHeight: '100vh' }}>
      {/* HERO SECTION */}
      <section className="jb-hero">
        <div className="jb-container">
          <div className="jb-hero-headline-box">
            <h1 className="jb-hero-title">
              CloudJob - Nâng tầm sự nghiệp, Kết nối việc làm Cloud
            </h1>
          </div>

          {/* Main Floating Search Bar Card */}
          <div className="jb-search-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="jb-search-grid"
            >
              {/* Keyword Input */}
              <div className="jb-input-field">
                <SearchIcon size={20} color="var(--color-primary-container)" />
                <input
                  type="text"
                  placeholder="Vị trí, kỹ năng: AWS, React, Python, Kubernetes..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  aria-label="Từ khóa tìm kiếm"
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '4px',
                      cursor: 'pointer',
                      color: 'var(--color-outline)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Xóa từ khóa"
                  >
                    <XIcon size={16} />
                  </button>
                )}
              </div>

              {/* Location Picker Component */}
              <div className="jb-loc-picker-wrapper" ref={locPickerRef}>
                <div
                  className={`jb-loc-trigger ${isLocPickerOpen ? 'open' : ''}`}
                  onClick={() => setIsLocPickerOpen(!isLocPickerOpen)}
                  role="button"
                  tabIndex={0}
                  aria-haspopup="dialog"
                  aria-expanded={isLocPickerOpen}
                >
                  <div className="jb-loc-trigger-content">
                    <MapPinIcon size={18} color="var(--color-primary-container)" />
                    <span className={`jb-loc-trigger-text ${selectedLocations.length === 0 ? 'placeholder' : ''}`}>
                      {selectedLocations.length === 0
                        ? 'Tất cả địa điểm'
                        : selectedLocations.length === 1
                        ? selectedLocations[0]
                        : `${selectedLocations[0]} (+${selectedLocations.length - 1})`}
                    </span>
                  </div>

                  <div className="jb-loc-trigger-actions">
                    {selectedLocations.length > 0 && (
                      <span
                        className="jb-loc-clear-icon"
                        title="Xóa địa điểm đã chọn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocations([]);
                        }}
                      >
                        <XIcon size={14} />
                      </span>
                    )}
                    {isLocPickerOpen ? (
                      <ChevronUpIcon size={16} color="var(--color-outline)" />
                    ) : (
                      <ChevronDownIcon size={16} color="var(--color-outline)" />
                    )}
                  </div>
                </div>

                {/* Popover Panel */}
                {isLocPickerOpen && (
                  <div className="jb-loc-popover" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="jb-loc-popover-header">
                      <span className="jb-loc-popover-label">Tìm theo:</span>

                      <button
                        type="button"
                        className={`jb-loc-radio-pill ${locSearchMode === 'legacy' ? 'active' : ''}`}
                        onClick={() => {
                          setLocSearchMode('legacy');
                          setDistrictQuery('');
                        }}
                      >
                        <span className="jb-loc-radio-dot">
                          {locSearchMode === 'legacy' && <span className="jb-loc-radio-dot-inner" />}
                        </span>
                        <span>Tỉnh, Quận/huyện cũ</span>
                      </button>

                      <button
                        type="button"
                        className={`jb-loc-radio-pill ${locSearchMode === 'after_2025' ? 'active' : ''}`}
                        onClick={() => {
                          setLocSearchMode('after_2025');
                          setDistrictQuery('');
                        }}
                      >
                        <span className="jb-loc-radio-dot">
                          {locSearchMode === 'after_2025' && <span className="jb-loc-radio-dot-inner" />}
                        </span>
                        <span>Tỉnh, Phường/xã sau 1/7/2025</span>
                        <span className="jb-loc-badge-new">Mới</span>
                      </button>
                    </div>

                    {/* Split 2-Column Body */}
                    <div className="jb-loc-split-body">
                      {/* Left Pane: Provinces */}
                      <div className="jb-loc-pane-left">
                        <div className="jb-loc-search-box">
                          <SearchIcon size={16} color="var(--color-outline)" />
                          <input
                            type="text"
                            placeholder="Nhập Tỉnh/Thành phố"
                            value={provinceQuery}
                            onChange={(e) => setProvinceQuery(e.target.value)}
                          />
                        </div>

                        <div className="jb-loc-scroll-list">
                          {filteredProvinces.map((prov) => {
                            const isChecked = selectedLocations.includes(prov.name);
                            const isFocused = focusedProvinceId === prov.id;
                            return (
                              <div
                                key={prov.id}
                                className={`jb-loc-item-row ${isFocused ? 'focused' : ''}`}
                                onClick={() => handleSelectProvinceRow(prov.id)}
                              >
                                <div
                                  className="jb-loc-item-left-content"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleToggleProvince(prov.name, prov.id)}
                                  />
                                  <span
                                    onClick={() => handleSelectProvinceRow(prov.id)}
                                    style={{ cursor: 'pointer' }}
                                  >
                                    {prov.name}
                                  </span>
                                </div>
                                <ChevronRightIcon size={14} color="var(--color-outline)" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right Pane: Districts / Wards */}
                      <div className="jb-loc-pane-right">
                        <div className="jb-loc-search-box">
                          <SearchIcon size={16} color="var(--color-outline)" />
                          <input
                            type="text"
                            disabled={hasMultipleProvincesSelected}
                            placeholder={
                              hasMultipleProvincesSelected
                                ? 'Không khả dụng khi chọn nhiều tỉnh'
                                : locSearchMode === 'after_2025'
                                ? 'Nhập Phường/Xã/Quận/Huyện'
                                : 'Nhập Quận/Huyện'
                            }
                            value={districtQuery}
                            onChange={(e) => setDistrictQuery(e.target.value)}
                            style={
                              hasMultipleProvincesSelected
                                ? { cursor: 'not-allowed', opacity: 0.6 }
                                : {}
                            }
                          />
                        </div>

                        <div className="jb-loc-scroll-list">
                          {hasMultipleProvincesSelected ? (
                            <div className="jb-loc-empty-state">
                              <svg width="84" height="84" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.85 }}>
                                <path d="M 62 50 C 72 50, 78 58, 85 64" stroke="#bfc9c3" strokeWidth="1.5" strokeLinecap="round" />
                                <rect x="36" y="44" width="8" height="24" rx="3" fill="#e6e8ea" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 44 48 C 44 44, 60 44, 60 48 L 59 68 C 59 70, 43 70, 44 68 Z" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 45 69 L 45 78 C 45 80, 50 80, 50 78 L 50 69" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 53 69 L 53 78 C 53 80, 58 80, 58 78 L 58 69" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 48 50 C 54 53, 58 54, 62 50" stroke="#6f7974" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="52" cy="30" r="16" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 54 22 C 60 22, 64 26, 64 30 C 64 34, 60 38, 54 38 Z" fill="rgba(9, 87, 68, 0.15)" stroke="var(--color-primary-container)" strokeWidth="1.5" />
                                <rect x="42" y="27" width="3" height="7" rx="1.5" fill="#6f7974" />
                              </svg>
                              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)', marginTop: '12px' }}>
                                Đang chọn {selectedProvinces.length} Tỉnh/Thành phố
                              </p>
                              <p style={{ fontSize: '12px', color: 'var(--color-outline)', marginTop: '4px', maxWidth: '240px', lineHeight: 1.4 }}>
                                Danh sách quận/huyện để trống khi chọn từ 2 tỉnh trở lên.
                              </p>
                            </div>
                          ) : activeProvinceObj ? (
                            filteredSubdivisions.length > 0 ? (
                              filteredSubdivisions.map((item) => {
                                const isChecked = selectedLocations.includes(item);
                                return (
                                  <label
                                    key={item}
                                    className="jb-loc-item-row"
                                  >
                                    <div className="jb-loc-item-left-content">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handleToggleLocation(item)}
                                      />
                                      <span>{item}</span>
                                    </div>
                                  </label>
                                );
                              })
                            ) : (
                              <div className="jb-loc-empty-state">
                                <p style={{ fontSize: '13px', color: 'var(--color-outline)' }}>
                                  {locSearchMode === 'after_2025'
                                    ? 'Không tìm thấy phường/xã phù hợp'
                                    : 'Không tìm thấy quận/huyện phù hợp'}
                                </p>
                              </div>
                            )
                          ) : (
                            <div className="jb-loc-empty-state">
                              <svg width="84" height="84" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.85 }}>
                                <path d="M 62 50 C 72 50, 78 58, 85 64" stroke="#bfc9c3" strokeWidth="1.5" strokeLinecap="round" />
                                <rect x="36" y="44" width="8" height="24" rx="3" fill="#e6e8ea" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 44 48 C 44 44, 60 44, 60 48 L 59 68 C 59 70, 43 70, 44 68 Z" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 45 69 L 45 78 C 45 80, 50 80, 50 78 L 50 69" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 53 69 L 53 78 C 53 80, 58 80, 58 78 L 58 69" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 48 50 C 54 53, 58 54, 62 50" stroke="#6f7974" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="52" cy="30" r="16" fill="#f2f4f6" stroke="#6f7974" strokeWidth="1.5" />
                                <path d="M 54 22 C 60 22, 64 26, 64 30 C 64 34, 60 38, 54 38 Z" fill="rgba(9, 87, 68, 0.15)" stroke="var(--color-primary-container)" strokeWidth="1.5" />
                                <rect x="42" y="27" width="3" height="7" rx="1.5" fill="#6f7974" />
                              </svg>
                              <p style={{ fontSize: '13px', color: 'var(--color-outline)', marginTop: '8px' }}>
                                Vui lòng chọn Tỉnh/Thành phố
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Popover Footer */}
                    <div className="jb-loc-popover-footer">
                      <button
                        type="button"
                        className="jb-loc-btn-clear-all"
                        onClick={handleClearAllLocations}
                      >
                        Bỏ chọn tất cả
                      </button>

                      <button
                        type="button"
                        className="jb-loc-btn-apply"
                        onClick={handleApplyLocations}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Search Button */}
              <button type="submit" className="jb-btn-search">
                <span>Tìm kiếm</span>
                <ArrowRightIcon size={18} color="#ffffff" />
              </button>
            </form>
          </div>

          {/* Trending Keywords */}
          <div className="jb-trending-row">
            <span style={{ fontWeight: '600', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUpIcon size={16} color="#90d4bb" />
              Từ khóa hot:
            </span>
            {HOT_KEYWORDS.map((kw) => {
              const isActive = keyword.trim().toLowerCase() === kw.toLowerCase();
              return (
                <button
                  key={kw}
                  type="button"
                  className={`jb-trending-pill ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setKeyword((prev) => (prev.toLowerCase() === kw.toLowerCase() ? '' : kw));
                  }}
                  title={isActive ? `Bỏ lọc "${kw}"` : `Lọc theo "${kw}"`}
                >
                  {kw}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MAIN 2-COLUMN WORKSPACE */}
      <section className="jb-workspace">
        <div className="jb-container">
          <div className="jb-workspace-grid">
            {/* ASIDE FILTER PANEL (Left Column) */}
            <aside className="jb-filter-panel">
              {/* Header */}
              <div className="jb-filter-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SlidersIcon size={18} color="var(--color-primary-container)" />
                  <h2>Bộ Lọc Nâng Cao</h2>
                </div>
                <button
                  type="button"
                  className="jb-filter-reset-btn"
                  onClick={handleResetFilters}
                >
                  Đặt lại
                </button>
              </div>

              {/* Group 1: Work Mode */}
              <div className="jb-filter-group">
                <div className="jb-filter-group-title">
                  <span>Hình thức làm việc</span>
                </div>
                {[
                  'Toàn thời gian',
                  'Bán thời gian',
                  'Làm từ xa / Remote',
                  'Hybrid linh hoạt'
                ].map((key) => (
                  <label key={key} className="jb-filter-checkbox-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={!!workModes[key]}
                        onChange={(e) =>
                          setWorkModes({ ...workModes, [key]: e.target.checked })
                        }
                        style={{ accentColor: 'var(--color-primary-container)', width: '16px', height: '16px' }}
                      />
                      <span>{key}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Group 2: Seniority */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Cấp bậc kinh nghiệm</span>
                </div>
                {[
                  'Intern',
                  'Fresher / Junior',
                  'Middle',
                  'Senior Specialist',
                  'Lead / Principal Architect'
                ].map((key) => (
                  <label key={key} className="jb-filter-checkbox-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={!!levels[key]}
                        onChange={(e) =>
                          setLevels({ ...levels, [key]: e.target.checked })
                        }
                        style={{ accentColor: 'var(--color-primary-container)', width: '16px', height: '16px' }}
                      />
                      <span>{key}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Group 3: Salary Range (VND) */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Mức lương mong muốn</span>
                  <span style={{ fontSize: '12px', color: 'var(--color-primary-container)', fontWeight: '700' }}>
                    {salaryRange[0]} - {salaryRange[1]} triệu VNĐ
                  </span>
                </div>

                <div className="jb-slider-track">
                  <div
                    className="jb-slider-fill"
                    style={{
                      left: `${Math.max(0, ((salaryRange[0] - 1) / 119) * 100)}%`,
                      right: `${Math.max(0, 100 - ((salaryRange[1] - 1) / 119) * 100)}%`
                    }}
                  />
                  <input
                    type="range"
                    min={1}
                    max={120}
                    step={1}
                    value={salaryRange[0]}
                    onChange={(e) => {
                      const val = Math.min(Number(e.target.value), salaryRange[1] - 1);
                      setSalaryRange([val, salaryRange[1]]);
                    }}
                    className="jb-salary-input-range"
                    aria-label="Mức lương tối thiểu"
                  />
                  <input
                    type="range"
                    min={1}
                    max={120}
                    step={1}
                    value={salaryRange[1]}
                    onChange={(e) => {
                      const val = Math.max(Number(e.target.value), salaryRange[0] + 1);
                      setSalaryRange([salaryRange[0], val]);
                    }}
                    className="jb-salary-input-range"
                    aria-label="Mức lương tối đa"
                  />
                </div>

                <div className="jb-salary-range-display">
                  <div className="jb-salary-range-pill">{salaryRange[0]} triệu/tháng</div>
                  <span style={{ color: 'var(--color-on-surface-variant)' }}>đến</span>
                  <div className="jb-salary-range-pill">{salaryRange[1]} triệu/tháng</div>
                </div>

                <div className="jb-salary-preset-row">
                  {[
                    { label: 'Tất cả', range: [1, 120] as [number, number] },
                    { label: '1 - 10 tr (Intern)', range: [1, 10] as [number, number] },
                    { label: '10 - 50 tr', range: [10, 50] as [number, number] },
                    { label: '50 - 80 tr', range: [50, 80] as [number, number] },
                    { label: 'Trên 80 tr', range: [80, 120] as [number, number] }
                  ].map((preset) => {
                    const isPresetActive =
                      salaryRange[0] === preset.range[0] && salaryRange[1] === preset.range[1];
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        className={`jb-salary-preset-btn ${isPresetActive ? 'active' : ''}`}
                        onClick={() => setSalaryRange(preset.range)}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                  <input
                    type="checkbox"
                    checked={includeNegotiable}
                    onChange={(e) => setIncludeNegotiable(e.target.checked)}
                    style={{ accentColor: 'var(--color-primary-container)', width: '15px', height: '15px' }}
                  />
                  <span>Bao gồm lương &quot;Thỏa thuận&quot;</span>
                </label>
              </div>

              {/* Group 4: Technology Pills */}
              <div className="jb-filter-group" style={{ paddingTop: '8px', borderTop: '1px solid var(--color-surface-container)' }}>
                <div className="jb-filter-group-title">
                  <span>Kỹ năng &amp; Công nghệ</span>
                </div>
                <div className="jb-skill-pills">
                  {availableSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        className={`jb-skill-pill-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => handleToggleSkill(skill)}
                      >
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="jb-btn-apply-filters">
                  Áp dụng bộ lọc
                </button>
                <button
                  type="button"
                  className="jb-btn-clear-filters"
                  onClick={handleResetFilters}
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            </aside>

            {/* MAIN JOBS FEED (Right Column) */}
            <main>
              {/* Results Status Bar */}
              <div className="jb-feed-status-bar">
                <div className="jb-status-title-group">
                  <span className="jb-status-title">
                    Tìm thấy {filteredJobs.length} việc làm phù hợp
                  </span>
                  <span className="jb-status-pill">
                    AWS • Senior • Remote/HCM
                  </span>
                </div>

                <div className="jb-sort-group">
                  <label htmlFor="sort-select">Sắp xếp theo:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="jb-sort-select"
                  >
                    <option value="ai-best">Độ khớp AI cao nhất (Khuyên dùng)</option>
                    <option value="newest">Mới nhất hôm nay</option>
                    <option value="salary">Mức lương cao nhất</option>
                  </select>
                </div>
              </div>

              {/* Jobs List */}
              <div className="jb-job-list">
                {filteredJobs.length === 0 ? (
                  <div
                    style={{
                      padding: '48px 24px',
                      textAlign: 'center',
                      backgroundColor: 'var(--color-surface-container-lowest)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-surface-container-high)'
                    }}
                  >
                    <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                      Không tìm thấy việc làm phù hợp với bộ lọc hiện tại
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '16px' }}>
                      Thử xóa bớt các tiêu chí lọc kỹ năng hoặc địa điểm để xem thêm kết quả.
                    </p>
                    <button
                      type="button"
                      className="jb-btn-apply"
                      onClick={handleResetFilters}
                    >
                      Đặt lại bộ lọc
                    </button>
                  </div>
                ) : (
                  paginatedJobs.map((job) => {
                    const isBookmarked = isAuthenticated && role === 'candidate' && bookmarkedIds.includes(job.id);

                    // Location short display: e.g. "Hồ Chí Minh (mới)", "Hà Nội", "Đà Nẵng"
                    const provinceName = job.rawLocation?.province || (typeof job.location === 'string' ? job.location.split('•')[0].split(',').pop()?.trim() : '') || 'Toàn quốc';
                    const displayLocation = provinceName === 'Hồ Chí Minh' ? 'Hồ Chí Minh (mới)' : provinceName;

                    // Experience short display: e.g. "3 năm", "5+ năm", "Intern"
                    const expYears = job.experience.match(/\d+(\+)?/);
                    const displayExp = expYears ? `${expYears[0]} năm` : (job.level === 'Intern' ? 'Thực tập' : job.experience);

                    // Skills snippet: e.g. "AWS | Docker | Kubernetes | +3"
                    const visibleSkills = job.skills.slice(0, 3);
                    const remainingSkillsCount = Math.max(0, job.skills.length - 3);

                    const isApplied = isAuthenticated && role === 'candidate' && appliedJobIds.some(
                      (id) => id === job.id || (job.title && id.toLowerCase() === job.title.toLowerCase())
                    );

                    return (
                      <article
                        key={job.id}
                        className={`jb-job-compact-card ${isApplied ? 'jb-job-applied' : ''}`}
                        onClick={() => navigate(`/jobs/${job.id}`)}
                      >
                        {/* Company Avatar Box */}
                        <CompanyAvatar name={job.companyName} size={48} />

                        {/* Content Right */}
                        <div className="jb-compact-content">
                          {/* Row 1: Title & Salary */}
                          <div className="jb-compact-top-row">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                              <h3 className="jb-compact-title">
                                {job.title}
                              </h3>
                              {isApplied && (
                                <span className="jb-applied-status-badge">
                                  Đã ứng tuyển
                                </span>
                              )}
                            </div>
                            <div className="jb-compact-salary">
                              <DollarSignIcon size={16} color="#059669" />
                              <span>{job.salaryText}</span>
                            </div>
                          </div>

                          {/* Row 2: Company Name */}
                          <div className="jb-compact-company-name">
                            {job.companyName}
                          </div>

                          {/* Row 3: Tags / Pills */}
                          <div className="jb-compact-pills-row">
                            <span className="jb-compact-pill">
                              {displayLocation}
                            </span>
                            <span className="jb-compact-pill">
                              {displayExp}
                            </span>
                            <span className="jb-compact-pill" style={{ color: 'var(--color-primary-container)' }}>
                              {job.workType}
                            </span>
                          </div>

                          {/* Row 4: Bottom Meta */}
                          <div className="jb-compact-bottom-row">
                            <div className="jb-compact-skills-text">
                              <span>{visibleSkills.join(' | ')}</span>
                              {remainingSkillsCount > 0 && (
                                <span style={{ color: '#059669', fontWeight: '600', marginLeft: '4px' }}>
                                  | +{remainingSkillsCount}
                                </span>
                              )}
                            </div>

                            <div className="jb-compact-right-meta">
                              <span className="jb-compact-time">{job.postedTime}</span>
                              <button
                                type="button"
                                className={`jb-compact-heart-btn ${isBookmarked ? 'active' : ''}`}
                                title={isBookmarked ? 'Bỏ lưu tin' : 'Lưu tin'}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleBookmark(job.id);
                                }}
                              >
                                <HeartIcon
                                  size={16}
                                  color="#059669"
                                  fill={isBookmarked ? '#059669' : 'none'}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>

              {/* NÚT XEM THÊM VIỆC LÀM */}
              {safeCurrentPage < totalPages && (
                <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                      document.querySelector('.jb-workspace')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '11px 32px',
                      borderRadius: '9999px',
                      border: '1.5px solid #059669',
                      backgroundColor: '#ffffff',
                      color: '#059669',
                      fontSize: '14px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ecfdf5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    Xem thêm việc làm
                  </button>
                </div>
              )}

              {/* PAGINATION BAR */}
              {totalJobs > 0 && (
                <div className="jb-pagination-bar">
                  <span style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)' }}>
                    Hiển thị <strong style={{ color: 'var(--color-on-surface)' }}>{startIndex + 1} - {endIndex}</strong> trong tổng số <strong style={{ color: 'var(--color-on-surface)' }}>{totalJobs}</strong> việc làm
                  </span>

                  {totalPages > 1 && (
                    <nav className="jb-pagination-nav" aria-label="Phân trang danh sách việc làm">
                      <button
                        type="button"
                        className="jb-page-btn-wide"
                        disabled={safeCurrentPage <= 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          document.querySelector('.jb-workspace')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <ChevronLeftIcon size={14} />
                        <span>Trước</span>
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          type="button"
                          className={`jb-page-btn ${pageNum === safeCurrentPage ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentPage(pageNum);
                            document.querySelector('.jb-workspace')?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="jb-page-btn-wide"
                        disabled={safeCurrentPage >= totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          document.querySelector('.jb-workspace')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <span>Sau</span>
                        <ChevronRightIcon size={14} />
                      </button>
                    </nav>
                  )}
                </div>
              )}

              {/* BOTTOM CALL-TO-ACTION PROMO BANNER */}
              <div className="jb-promo-banner">
                <div className="jb-promo-content">
                  <div className="jb-promo-icon-box">
                    <DocumentScannerIcon size={28} color="#ffffff" />
                  </div>
                  <div>
                    <h4 className="jb-promo-title">
                      Chưa chắc chắn về độ phù hợp của CV với thị trường?
                    </h4>
                    <p className="jb-promo-desc">
                      Tải hồ sơ của bạn lên để AWS Bedrock AI phân tích miễn phí, rà soát từ khóa ATS và gợi ý danh sách việc làm có tỉ lệ phỏng vấn cao nhất!
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="jb-btn-promo"
                  onClick={() => {
                    if (isAuthenticated && role === 'candidate') {
                      navigate('/candidate');
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <UploadIcon size={18} color="#ffffff" />
                  <span>Kiểm tra CV với AI ngay</span>
                </button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* AI RUBRIC TRANSPARENCY MODAL */}
      {activeRubricJob && activeRubricJob.rubricBreakdown && (
        <div
          className="jb-modal-backdrop"
          onClick={() => setActiveRubricJob(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="jb-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="jb-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SparklesIcon size={20} color="var(--color-primary-container)" />
                <h3>Báo Cáo Phân Tích Rubric AI - AWS Bedrock</h3>
              </div>
              <button
                type="button"
                className="jb-modal-close-btn"
                onClick={() => setActiveRubricJob(null)}
                aria-label="Đóng cửa sổ Rubric"
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="jb-modal-body">
              <div>
                <p style={{ fontSize: '13px', color: 'var(--color-on-surface-variant)', marginBottom: '4px' }}>
                  Vị trí tuyển dụng:
                </p>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--color-on-surface)', margin: 0 }}>
                  {activeRubricJob.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-primary-container)', fontWeight: '600', marginTop: '2px' }}>
                  {activeRubricJob.companyName}
                </p>
              </div>

              {/* Total Score Banner */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(9, 87, 68, 0.08)',
                  border: '1px solid rgba(9, 87, 68, 0.2)'
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-primary-container)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Tổng điểm tương thích hồ sơ
                  </span>
                  <p style={{ fontSize: '13px', color: 'var(--color-on-surface)', marginTop: '4px', maxWidth: '420px', lineHeight: 1.45 }}>
                    {activeRubricJob.rubricBreakdown.summary}
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--color-primary-container)', lineHeight: 1 }}>
                    {activeRubricJob.rubricBreakdown.total}%
                  </span>
                  <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-on-surface-variant)', marginTop: '2px' }}>
                    Chuẩn Haiku 4.5
                  </span>
                </div>
              </div>

              {/* 4 Rubric Pillars */}
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '12px' }}>
                  Chi Tiết Điểm 4 Trụ Cột Đánh Giá
                </h5>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Kinh nghiệm</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.experience}/35đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Kỹ năng kỹ thuật</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.skills}/30đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Học vấn &amp; Cert</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.education}/15đ
                    </strong>
                  </div>

                  <div style={{ padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface-container)', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-variant)', display: 'block' }}>Độ khớp văn hóa</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary-container)', display: 'block', marginTop: '4px' }}>
                      {activeRubricJob.rubricBreakdown.culture}/20đ
                    </strong>
                  </div>
                </div>
              </div>

              {/* Strengths List */}
              <div>
                <h5 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-on-surface)', marginBottom: '8px' }}>
                  Điểm mạnh nổi bật phát hiện trong CV:
                </h5>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
                  {activeRubricJob.rubricBreakdown.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--color-surface-container)' }}>
                <button
                  type="button"
                  className="jb-btn-clear-filters"
                  style={{ width: 'auto' }}
                  onClick={() => setActiveRubricJob(null)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="jb-btn-apply"
                  onClick={() => {
                    const job = activeRubricJob;
                    setActiveRubricJob(null);
                    handleApply(job);
                  }}
                >
                  Nộp đơn ứng tuyển vị trí này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoard;
