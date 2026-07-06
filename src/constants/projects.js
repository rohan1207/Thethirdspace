import { buildProjectAssets } from "./projectAssets";

const pool = buildProjectAssets("pavilion-pool");
const formist = buildProjectAssets("formist-treehouse");
const hover = buildProjectAssets("hover-space");
const solids = buildProjectAssets("solid-semi-void");
const figured = buildProjectAssets("figured-ground");
const kle = buildProjectAssets("kle-centenary");
const stacked = buildProjectAssets("stacked-student");
const skylights = buildProjectAssets("skylights");

export const WORK_PROJECTS = [
  {
    id: "pool-pavilion",
    category: "Residential",
    name: "The Pool Pavilion",
    location: "Belagavi, Karnataka",
    year: "2024",
    ...pool,
    description:
      "A semi-open swimming pool pavilion with terracotta screens and a glass canopy — an experiential extension of the home and a passive cooling device.",
    concept:
      "Set within the dense fabric of an old urban neighborhood, this residence negotiates the paradox of a maximal lifestyle within a framework of minimal aesthetic sensibilities. The programmatic brief was exacting: parking for seven cars, expansive service zones, four bedrooms, a home theatre, and a swimming pool, all on a constrained site where every square metre carried weight. The home is elevated on a high plinth, allowing the semi-ground floor to discreetly house service functions. The eastern setback was reimagined as a swimming pool — not a residual margin, but a pavilion-like extension bound by terracotta screens on three sides and capped with a glass canopy, functioning simultaneously as performative landscape and passive cooling device.",
    designHighlights: [
      "The eastern setback is reinterpreted as a semi-open swimming pool pavilion with terracotta screens and a glass canopy, functioning both as an experiential extension of the home and a passive cooling device.",
      "Public spaces are choreographed between the transparent pool enclosure and the solid private block, with sectional openings enabling layered views and soft, reflected light across interiors.",
      "The plan strictly follows Vastu principles while fostering spatial interlock, balancing privacy with openness. A restrained palette of timber and neutrals underscores the client's spiritual and aesthetic leanings.",
    ],
    client: "Private Client",
    area: "600 sq.m",
    status: "Built",
    role: "Architecture & Interiors",
    team: "Praveen Bavadekar, Madhuri Gulbani",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    structural: "D L Kulkarni & Associates, Belagavi",
    details: [
      { label: "Typology", value: "Residential" },
      { label: "Location", value: "Belagavi, Karnataka" },
      { label: "Completion", value: "2024" },
      { label: "Area", value: "600 sq.m" },
      { label: "Principals", value: "Praveen Bavadekar & Namrata Betigiri" },
    ],
  },
  {
    id: "formist-treehouse",
    category: "Architecture",
    name: "The Formist Treehouse",
    location: "Bengaluru, Karnataka",
    year: "2022",
    ...formist,
    description:
      "A multi-family housing block that reinterprets the urban street as a social spine within a compact apartment building of 56 homes.",
    concept:
      "The peri-urban fabric of Bengaluru is rapidly transforming, marked by an unrelenting proliferation of housing blocks that range from modest multi-storey residences to expansive gated communities. While large-scale developments often generate a sense of community through their sheer magnitude, smaller stand-alone buildings struggle to foster notions of neighbourhood and shared identity. This project explores how the quintessentially urban phenomenon of the street, with its layered social life, can be reinterpreted within a compact apartment building of just 56 homes.",
    designHighlights: [
      "The Club is reconceptualised as a treehouse and the vertical core of community life, transforming circulation spaces into dynamic social arenas.",
      "Balconies, peripheries, and the terrace are integrated with kitchen gardens, creating productive green edges that enhance biodiversity, temper climate, and enrich residents' daily living.",
      "By embedding layered public spaces on each floor, the design reinterprets the urban street as a social spine within a compact apartment block, fostering neighbourhood interaction in a vertical format.",
    ],
    client: "The Formist Group",
    area: "10,000 sq.m",
    status: "Built",
    role: "Architecture",
    team: "Praveen Bavadekar, Namrata Betigiri, Shivraj Kutre, Maru Bidrewadi",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    structural: "Ambarish and Associates, Bengaluru",
    landscape: "Sudhir Choughule, EcoInscape Bengaluru",
    details: [
      { label: "Typology", value: "Multi-family housing" },
      { label: "Location", value: "Bengaluru, Karnataka" },
      { label: "Completion", value: "2022" },
      { label: "Area", value: "10,000 sq.m" },
      { label: "Client", value: "The Formist Group" },
    ],
  },
  {
    id: "hover-space",
    category: "Architecture",
    name: "Hover Space",
    location: "Belagavi, Karnataka",
    year: "2019",
    ...hover,
    description:
      "A floating corporate office addition above a fifty-year-old institutional building — preserving memory while creating a new civic presence along a major city road.",
    concept:
      "Can an existing structure be expanded while preserving its integrity and identity? When a well-established educational charity institution required additional space for their 50-year-old corporate office, the existing building — though unremarkable in appearance — held significance within the collective memory of the institution. The challenge was to intervene without disrupting daily operations or harming interiors through intrusive structural modifications, while responding to the road, the century-old campus, and the adjacent sports ground.",
    designHighlights: [
      "The new structure floats above the old building as a hovering space supported by only eight carefully positioned cylindrical columns, creating an uninterrupted interior of approximately 1,000 sq.m.",
      "A continuous verandah wraps the column-free office, drawing from colonial architecture as both social space and climatic buffer against harsh rain and sun.",
      "An L-shaped plan creates a triple-height entry portal from the road to the campus, framing heritage structures along a central tree-lined avenue.",
      "A glass elevator and interstitial terrace bridge old and new, making the ritual of vertical movement part of the architectural experience.",
    ],
    sections: [
      {
        title: "The City Artery",
        body: "The proposed building needed to respond to its various contexts. As part of a sprawling hundred-acre educational campus, the structure occupied a significant position on a major road in Belagavi. It was essential for the building to establish itself as a visual landmark along this important city road.",
      },
      {
        title: "The Campus",
        body: "The new building would also serve as one of the frontages of the century-old campus. Due to the abundance of trees and the low-lying nature of the buildings, the campus appeared as a long perimeter wall from the city. This presented an opportunity to create an intervention that would enhance the campus's identity and make it recognizable.",
      },
      {
        title: "Resolution",
        body: "Despite its seemingly simple appearance, the new addition possesses multiple layers of complexity. It responds to the road as a linear screened box, serves as an entryway portal to the campus, and acts as a backdrop for the sports ground. The offices, with their blend of private chambers and open work desks, greatly benefit from exterior verandahs that shield interiors while allowing glimpses of the surrounding campus through layers of transparency.",
      },
    ],
    client: "Educational Charity Institution",
    area: "1,000 sq.m (addition)",
    status: "Built",
    role: "Architecture",
    team: "Praveen Bavadekar, Namrata Betigiri",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    structural: "D.L. Kulkarni & Associates, Belagavi",
    details: [
      { label: "Typology", value: "Corporate office" },
      { label: "Location", value: "Belagavi, Karnataka" },
      { label: "Completion", value: "2019" },
      { label: "Area", value: "~1,000 sq.m addition" },
      { label: "Principals", value: "Praveen Bavadekar & Namrata Betigiri" },
    ],
  },
  {
    id: "two-solids-semi-void",
    category: "Residential",
    name: "Two Solids and A Semi Void",
    location: "Belagavi, Karnataka",
    year: "2021",
    ...solids,
    description:
      "A five-bedroom house in Hindawadi that balances single-function rooms and versatile spaces — an architectural tribute to the neighbourhood's rich history.",
    concept:
      "Two Solids and a Semi Void stands as an architectural tribute to the rich history of Hindawadi, creating a unique space that resonates with the family legacy of its occupants and the community's spirit. The clients, deeply entrenched in Belagavi's rich textile economic fabric, envisioned a sanctuary that reflected their legacy while embracing modern living with minimalist accents. Core areas such as the kitchen, mandir, and bedrooms are positioned in accordance with Vastu Shastra at the far corners, while central living, dining, and recreational areas form the heart of the home.",
    designHighlights: [
      "The northeast entrance choreographs a sequence from a serene courtyard with a majestic mango tree through to lush rear gardens visible from the living room.",
      "Private rooms are enclosed and cosy, contrasting with open, transparent living areas that blur the line between inner sanctum and outdoors.",
      "The layout unfolds in three bands — eastern culinary and spiritual spaces, western bedrooms and staircase, and a fluid interstitial realm for communal life.",
      "A material palette of wood, stone, printed tiles, and patterned wallpaper adds warmth to stark white floors and expansive glazed openings.",
    ],
    client: "Private Client",
    area: "Private Residence",
    status: "Built",
    role: "Architecture",
    team: "Thirdspace Architecture Studio",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    details: [
      { label: "Typology", value: "Residential" },
      { label: "Location", value: "Hindawadi, Belagavi" },
      { label: "Program", value: "Five-bedroom house" },
      { label: "Status", value: "Built" },
      { label: "Principals", value: "Praveen Bavadekar & Namrata Betigiri" },
    ],
  },
  {
    id: "figured-ground",
    category: "Education",
    name: "Figured Ground",
    location: "Belagavi, Karnataka",
    year: "2021",
    ...figured,
    description:
      "The Indoor Sports Arena at KLE Technological University — a building that mediates between landscape withdrawal and urban civic presence.",
    concept:
      "Can a structure embody dual personas — seamlessly integrating into its surroundings while also commanding attention? The Indoor Sports Arena at KLE Technological University grapples with such philosophical inquiries, seeking to reconcile the paradoxes of architecture, landscape, and urban identity. Sited within one of the last remaining green tracts of a 100-acre campus, the building occupies a residual space that abuts a major six-lane arterial road — embodying the duality of urban intensity on one side and campus serenity on the other.",
    designHighlights: [
      "Large sports volumes are partially submerged, enabling landscape to flow over and around them while preserving visual porosity from the campus.",
      "Central basketball and badminton courts transform into a convocation hall for 3,500, beneath a pyramidal steel roof with peripheral landscape roofscape.",
      "Three plazas to the east, west, and north function as social condensers extending campus life to the building's threshold.",
      "From the city, zinc cladding and glass form a taut angular envelope; a deep red soffit at the lifted corner creates an inviting interstitial space.",
    ],
    client: "KLE Technological University",
    area: "Indoor sports arena",
    status: "Built",
    role: "Architecture",
    team: "Thirdspace Architecture Studio",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    details: [
      { label: "Typology", value: "Sports & convocation" },
      { label: "Location", value: "KLE Technological University" },
      { label: "Capacity", value: "1,300 spectators / 3,500 convocation" },
      { label: "Status", value: "Built" },
      { label: "Principals", value: "Praveen Bavadekar & Namrata Betigiri" },
    ],
  },
  {
    id: "kle-centenary-museum",
    category: "Architecture",
    name: "KLE Centenary Museum",
    location: "Belagavi, Karnataka",
    year: "2016",
    ...kle,
    description:
      "A centenary museum repurposing an 80-year-old stone-and-timber structure — honouring the KLE Society's roots while inspiring future generations.",
    concept:
      "In 1916, seven young men returned to Belagavi with a shared dream of improving education in their hometown, establishing what would grow into the KLE Society — now over 250 institutions across Karnataka and Maharashtra. To mark a hundred years of growth, the KLE Centenary Museum was envisioned not just as a commemorative space but as a symbolic gesture toward the next century. The chosen site was an 80-year-old stone-and-timber structure that had served as principal's residence, nursery, and eventually storage — a quiet witness to the passage of time.",
    designHighlights: [
      "The heritage building was restored while new pavilions were introduced as outdoor galleries folding the natural and built environment into the narrative.",
      "Visitors approach through the Pavilion of the Saptarishis — a clay-tile roofed walkway around a fig tree honouring founders and benefactors.",
      "A curvilinear staircase wraps the central core, acting as both circulation and display, drawing visitors upward through layers of the Society's story.",
      "Minimal interventions inside opened the plan into a continuous exhibition space with a new mezzanine and clerestory for light and ventilation.",
    ],
    client: "KLE Society",
    area: "Heritage building + pavilions",
    status: "Built",
    role: "Architecture",
    team: "Thirdspace Architecture Studio",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    details: [
      { label: "Typology", value: "Museum" },
      { label: "Location", value: "KLE Campus, Belagavi" },
      { label: "Completion", value: "2016" },
      { label: "Status", value: "Built" },
      { label: "Client", value: "KLE Society" },
    ],
  },
  {
    id: "stacked-student-housing",
    category: "Education",
    name: "Stacked Student Housing",
    location: "Belagavi, Karnataka",
    year: "2020",
    ...stacked,
    description:
      "Student housing on a 100 sq.m plot — a masterclass in spatial economy housing 29 residents within a bold terracotta monolith.",
    concept:
      "Situated on a modest 100 sqm plot in the heart of Belagavi, this student housing project is a masterclass in spatial economy and architectural ingenuity. Conceived as a complex layering of compact, self-contained units, the design prioritizes both density and dignity, maximizing every square inch without compromising on comfort or quality of life for its 29 student residents. Clad in deep terracotta red, the building's staggered roofline slices through the suburban skyline within a 15-meter statutory height limit.",
    designHighlights: [
      "A floor-to-floor height of 2,400mm enables efficient vertical stacking while two interlocked room typologies form a modular grid tailored for maximum utility.",
      "Toilet partitions use 40mm kadappa stone slabs to save space; unplastered brick walls painted white expand visual scale and simplify upkeep.",
      "A central staircase acts as a social spine connecting compact lobby, pantry, and sanitary facilities around shared semi-private zones.",
      "Windows punctuate the facade in an irregular pattern, serving as light inlets and expressive elements within an otherwise unified sculptural mass.",
    ],
    client: "Private Developer",
    area: "100 sq.m plot",
    status: "Built",
    role: "Architecture",
    team: "Thirdspace Architecture Studio",
    principals: "Praveen Bavadekar & Namrata Betigiri",
    details: [
      { label: "Typology", value: "Student housing" },
      { label: "Location", value: "Belagavi, Karnataka" },
      { label: "Residents", value: "29 students" },
      { label: "Plot", value: "100 sq.m" },
      { label: "Status", value: "Built" },
    ],
  },
  {
    id: "house-of-skylights",
    category: "Residential",
    name: "The House of Skylights",
    location: "Pune, Maharashtra",
    year: "2019",
    ...skylights,
    description:
      "A three-generation family home in Pune organised around a central raintree — rich in spatial experience with a modest material palette.",
    concept:
      "The House of Skylights is home to a family of three generations. The site featured a large raintree at its centre and a gradual slope toward a seasonal rivulet to the north. Planning divided the structure centrally along an axis of the existing tree, a deepmaal, and a saraswati-yantra — with public areas on the ground floor, family bedrooms on the first, and music and entertainment spaces above. The client named the house 'Khyal' — a Hindustani classical music term for a composition that offers vast scope for improvisation within a restrained framework.",
    designHighlights: [
      "The central raintree divides the plan into two masses, creating a focal axis connecting nature, light, and ritual across all levels.",
      "Strategically placed skylights flood the first floor and landscaped areas with natural light, making spaces feel larger than their footprint.",
      "Berge-Ply cladding with metal jali on the first floor provides heat insulation, cross-ventilation, and dynamic shadow patterns throughout the year.",
      "Solar panels and rainwater harvesting cater to outdoor zones, integrating sustainability into the daily life of the home.",
    ],
    client: "Private Client",
    area: "Multi-storey residence",
    status: "Built",
    role: "Architecture (in collaboration)",
    team: "Niraj Doshi Design Consultancy in collaboration with Thirdspace Architecture Studio",
    principals: "Ar. Niraj Doshi & Ar. Praveen Bavadekar",
    collaboration: "Niraj Doshi Design Consultancy [N.D.D.C.]",
    details: [
      { label: "Typology", value: "Residential" },
      { label: "Location", value: "Pune, Maharashtra" },
      { label: "Name", value: "Khyal" },
      { label: "Status", value: "Built" },
      { label: "Collaboration", value: "N.D.D.C. & Thirdspace" },
    ],
  },
];

export const WORK_CATEGORIES = [
  "All",
  "Architecture",
  "Education",
  "Residential",
];

export const FEATURED_PROJECT_IDS = [
  "pool-pavilion",
  "formist-treehouse",
  "hover-space",
  "figured-ground",
  "kle-centenary-museum",
];

export const PRACTICE_CATEGORY_LINKS = {
  Educational: "Education",
  Architecture: "Architecture",
  Interiors: "Architecture",
  Urbanism: "Architecture",
};

export const GALLERY_DOMAIN_LINKS = {
  education: "Education",
  architecture: "Architecture",
  interiors: "Residential",
  urbanism: "Architecture",
  research: "Architecture",
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

export function getAllProjectImages(project) {
  return project.allImages ?? project.slideshow ?? [project.image];
}
