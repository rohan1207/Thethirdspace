import { FEATURED_PROJECT_IMAGES, HERO_IMAGES } from "./heroImages";

function galleryFrom(start, count = 5) {
  return Array.from({ length: count }, (_, i) => HERO_IMAGES[(start + i) % HERO_IMAGES.length]);
}

export const WORK_PROJECTS = [
  {
    id: "technology-institute",
    category: "Education",
    name: "Technology Institute Campus",
    location: "Belagavi, Karnataka",
    year: "2022",
    image: FEATURED_PROJECT_IMAGES[0],
    description:
      "A technology institute shaped by courtyards, shaded walkways, and flexible learning spaces — rooted in the climate and culture of North Karnataka.",
    overview:
      "The Technology Institute Campus reimagines technical education as a sequence of shaded outdoor rooms. Classrooms open onto colonnaded walkways, laboratories face inward to quiet courtyards, and the commons building anchors the social life of the campus at its geographic heart.",
    challenge:
      "The brief called for a high-density academic precinct on a tight, sloping site — without sacrificing daylight, cross-ventilation, or the informal gathering spaces that define campus culture in this region.",
    approach:
      "We organised the masterplan as a chain of linear blocks stepping with the topography. Deep overhangs, perforated screens, and locally sourced stone create a durable, low-maintenance envelope tuned to Belagavi's semi-arid climate.",
    gallery: galleryFrom(0, 6),
    client: "Private Education Trust",
    area: "18,400 sq.m",
    status: "Built",
    role: "Architecture & Masterplanning",
    team: "ThirdSpace Architecture Studio",
    awards: "Shortlisted — Institutional Design Award, 2023",
    details: [
      { label: "Typology", value: "Educational campus" },
      { label: "Focus", value: "Institute, labs, commons" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "18,400 sq.m" },
      { label: "Client", value: "Private Education Trust" },
    ],
  },
  {
    id: "student-hostel",
    category: "Education",
    name: "Student Hostel Block",
    location: "Pune, Maharashtra",
    year: "2021",
    image: FEATURED_PROJECT_IMAGES[1],
    description:
      "Residential quarters designed as a layered community — shared terraces, quiet study nooks, and durable materials for high-intensity student life.",
    overview:
      "This hostel block treats student housing as a social infrastructure project. Shared terraces, double-height lounges, and carefully calibrated room clusters encourage community without compromising privacy or acoustic comfort.",
    challenge:
      "Accommodate 480 students on a constrained urban plot while meeting strict fire, ventilation, and daylight codes — and deliver a building that feels humane rather than institutional.",
    approach:
      "A central atrium brings light deep into the plan. Room modules repeat along external corridors with alternating bay windows, creating rhythm along the façade and natural surveillance across shared floors.",
    gallery: galleryFrom(2, 5),
    client: "University Estates Department",
    area: "9,200 sq.m",
    status: "Built",
    role: "Architecture & Interiors",
    team: "ThirdSpace Architecture Studio",
    awards: null,
    details: [
      { label: "Typology", value: "Student housing" },
      { label: "Focus", value: "Hostel, dining, recreation" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "9,200 sq.m" },
      { label: "Client", value: "University Estates" },
    ],
  },
  {
    id: "school-campus",
    category: "Education",
    name: "School Campus Masterplan",
    location: "Karnataka, India",
    year: "2020",
    image: FEATURED_PROJECT_IMAGES[2],
    description:
      "A school campus organised around open courts and linear classroom blocks — balancing shade, play, and the everyday rhythms of learning.",
    overview:
      "The school campus masterplan frames learning as movement between courts, corridors, and landscape. Younger grades occupy protected inner courts; senior blocks open toward sports fields and the tree line at the site's edge.",
    challenge:
      "Design for 1,200 students across K-12 on agricultural land at the urban periphery — integrating stormwater management, future expansion, and safe pedestrian circulation from day one.",
    approach:
      "A primary east-west spine connects arrival, administration, and assembly. Classroom wings plug into this spine as modular arms, each wrapping a play court sized to its age group.",
    gallery: galleryFrom(4, 5),
    client: "Independent School Foundation",
    area: "24,000 sq.m",
    status: "Built",
    role: "Masterplan & Architecture",
    team: "ThirdSpace Architecture Studio",
    awards: "Published in Architecture+Design, 2021",
    details: [
      { label: "Typology", value: "School" },
      { label: "Focus", value: "Classrooms, play, admin" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "24,000 sq.m" },
      { label: "Client", value: "School Foundation" },
    ],
  },
  {
    id: "institutional-hq",
    category: "Architecture",
    name: "Institutional Headquarters",
    location: "Belgaum, Karnataka",
    year: "2019",
    image: FEATURED_PROJECT_IMAGES[3],
    description:
      "A headquarters building that mediates between public forecourt and private work zones — experimental in form, precise in its response to context.",
    overview:
      "The headquarters building presents a civic face to the street while sheltering focused work zones behind a layered façade. A public forecourt, exhibition gallery, and meeting rooms occupy the lower levels; executive offices and research studios rise above in a quieter, top-lit volume.",
    challenge:
      "Express the institution's experimental identity without sacrificing workplace performance — balancing bold form-making with the practical demands of daily office life in a hot, dry climate.",
    approach:
      "We folded the plan around a shaded atrium and wrapped it in a double-skin façade of concrete and operable timber screens. The result is a building that reads as a landmark from the street and feels calm, filtered, and precise inside.",
    gallery: galleryFrom(6, 6),
    client: "Research & Development Institute",
    area: "6,800 sq.m",
    status: "Built",
    role: "Architecture",
    team: "ThirdSpace Architecture Studio",
    awards: "Award of Merit — Institutional Architecture, 2020",
    details: [
      { label: "Typology", value: "Institutional" },
      { label: "Focus", value: "Office, public interface" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "6,800 sq.m" },
      { label: "Client", value: "R&D Institute" },
    ],
  },
  {
    id: "urban-intervention",
    category: "Urbanism",
    name: "Urban Intervention Study",
    location: "Pune, Maharashtra",
    year: "2018",
    image: FEATURED_PROJECT_IMAGES[4],
    description:
      "A research-led urban proposal engaging public realm, circulation, and the layered histories of an Indian city centre.",
    overview:
      "This urban intervention study examines a congested city-centre junction as a civic room rather than a traffic problem. The proposal reclaims underused setbacks, aligns pedestrian desire lines, and introduces shaded micro-plazas at the scale of everyday rituals.",
    challenge:
      "Reconcile competing claims on a dense intersection — vehicular throughput, informal vending, heritage structures, and the absence of continuous footpaths — within a framework actionable for municipal stakeholders.",
    approach:
      "Through mapping, stakeholder workshops, and sectional studies, we identified three catalytic moves: a raised pedestrian deck, a continuous shade structure along the retail edge, and a phased street-furniture kit-of-parts deployable by the city.",
    gallery: galleryFrom(7, 5),
    client: "Municipal Urban Development Cell",
    area: "2.1 hectare study area",
    status: "Published / Unbuilt",
    role: "Urban Research & Design",
    team: "ThirdSpace Architecture Studio",
    awards: "Exhibited — Urban Design Biennale, 2019",
    details: [
      { label: "Typology", value: "Urban research" },
      { label: "Focus", value: "Public realm, mobility" },
      { label: "Status", value: "Published" },
      { label: "Area", value: "2.1 hectare" },
      { label: "Client", value: "Municipal UD Cell" },
    ],
  },
  {
    id: "interior-residence",
    category: "Interiors",
    name: "Residential Interior Study",
    location: "Pune, Maharashtra",
    year: "2017",
    image: HERO_IMAGES[5],
    description:
      "An interior narrative of light, material, and proportion — crafting intimate domestic spaces with architectural rigour.",
    overview:
      "This residential interior study transforms a compact urban apartment into a sequence of calm, light-filled rooms. Custom joinery, lime-washed walls, and hand-selected stone create a palette that ages gracefully and feels rooted in the Indian craft tradition.",
    challenge:
      "Deliver generous storage, acoustic privacy, and visual warmth within a 180 sq.m shell already constrained by structure and services — without any structural intervention.",
    approach:
      "We treated the plan as a series of thickened walls containing storage, services, and hidden doors. A single continuous ceiling plane and aligned floor joints unify the apartment while allowing each room its own character through material and light.",
    gallery: galleryFrom(8, 5),
    client: "Private Client",
    area: "180 sq.m",
    status: "Built",
    role: "Interior Architecture",
    team: "ThirdSpace Architecture Studio",
    awards: null,
    details: [
      { label: "Typology", value: "Residential interior" },
      { label: "Focus", value: "Living, dining, study" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "180 sq.m" },
      { label: "Client", value: "Private" },
    ],
  },
  {
    id: "campus-library",
    category: "Education",
    name: "Campus Library & Commons",
    location: "Belagavi, Karnataka",
    year: "2016",
    image: HERO_IMAGES[6],
    description:
      "A library and commons building that anchors the campus social life — generous volumes, filtered light, and layered study environments.",
    overview:
      "The library and commons building is the social heart of the campus — a place where reading, discussion, and informal learning overlap. A triple-height reading room faces north; smaller group study rooms and a café terrace wrap a shaded central court.",
    challenge:
      "Create a landmark building on modest budget using local labour and materials, while achieving the environmental performance expected of a 21st-century learning commons.",
    approach:
      "Brick cavity walls, precast concrete fins, and a folded metal roof create a durable envelope. Interior spaces are left raw and honest — exposed structure, polished concrete floors, and teak reading tables that students can repair and renew over time.",
    gallery: galleryFrom(9, 5),
    client: "Campus Development Authority",
    area: "4,500 sq.m",
    status: "Built",
    role: "Architecture",
    team: "ThirdSpace Architecture Studio",
    awards: "Featured — Education Design Review, 2017",
    details: [
      { label: "Typology", value: "Library & commons" },
      { label: "Focus", value: "Reading, collaboration" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "4,500 sq.m" },
      { label: "Client", value: "Campus Authority" },
    ],
  },
  {
    id: "public-plaza",
    category: "Urbanism",
    name: "Public Plaza & Forecourt",
    location: "Karnataka, India",
    year: "2015",
    image: HERO_IMAGES[7],
    description:
      "A civic forecourt connecting institutional buildings to the street — shade, seating, and a calibrated threshold between public and private.",
    overview:
      "The public plaza and forecourt stitches together three institutional buildings and the city street. Granite paving, native planting, and a rhythmic canopy structure define zones for gathering, circulation, and quiet pause.",
    challenge:
      "Design a civic space that functions during monsoon and peak summer alike — providing shade and drainage without the maintenance burden of a fully landscaped park.",
    approach:
      "We used a limited palette of durable materials and modular shade elements that can be replaced individually. The plaza slopes subtly toward planted bioswales, turning seasonal rain into a visible part of the spatial experience.",
    gallery: galleryFrom(10, 5),
    client: "Institutional Campus Trust",
    area: "3,200 sq.m",
    status: "Built",
    role: "Landscape & Urban Design",
    team: "ThirdSpace Architecture Studio",
    awards: null,
    details: [
      { label: "Typology", value: "Civic plaza" },
      { label: "Focus", value: "Public realm, shade" },
      { label: "Status", value: "Built" },
      { label: "Area", value: "3,200 sq.m" },
      { label: "Client", value: "Campus Trust" },
    ],
  },
];

export const WORK_CATEGORIES = [
  "All",
  "Education",
  "Architecture",
  "Interiors",
  "Urbanism",
];

export const FEATURED_PROJECT_IDS = [
  "technology-institute",
  "student-hostel",
  "school-campus",
  "institutional-hq",
  "urban-intervention",
];

export const PRACTICE_CATEGORY_LINKS = {
  Educational: "Education",
  Architecture: "Architecture",
  Interiors: "Interiors",
  Urbanism: "Urbanism",
};

export const GALLERY_DOMAIN_LINKS = {
  education: "Education",
  architecture: "Architecture",
  interiors: "Interiors",
  urbanism: "Urbanism",
  research: "Urbanism",
};

export function getProjectById(id) {
  return WORK_PROJECTS.find((p) => p.id === id) ?? null;
}

export function getProjectPath(id) {
  return `/work/${id}`;
}

export function getWorkCategoryPath(category) {
  const value = encodeURIComponent(category);
  return `/work?category=${value}`;
}

export function getFeaturedProjects() {
  return FEATURED_PROJECT_IDS.map((id, i) => {
    const project = getProjectById(id);
    return {
      ...project,
      index: String(i + 1).padStart(2, "0"),
    };
  });
}

export function getAdjacentProjects(id) {
  const index = WORK_PROJECTS.findIndex((p) => p.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? WORK_PROJECTS[index - 1] : null,
    next: index < WORK_PROJECTS.length - 1 ? WORK_PROJECTS[index + 1] : null,
  };
}

export function getRelatedProjects(id, limit = 3) {
  const current = getProjectById(id);
  if (!current) return [];
  return WORK_PROJECTS.filter((p) => p.id !== id && p.category === current.category).slice(
    0,
    limit
  );
}
