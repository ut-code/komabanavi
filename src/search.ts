export interface SearchableItem {
  id: string;
  name: string;
  type: "building" | "waterServer" | "vendingMachine";
  lat: number;
  lng: number;
  description?: string;
  buildingId?: string; // For buildings that have detail pages
}

// Building data with coordinates from markers.ts
export const searchableBuildings: SearchableItem[] = [
  {
    id: "library",
    name: "図書館",
    type: "building",
    lat: 939,
    lng: 2799,
    description: "Library - Study facilities and resources",
    buildingId: "library",
  },
  {
    id: "building1",
    name: "1号館",
    type: "building",
    lat: 1064,
    lng: 1904,
    description: "Building 1 - Information and educational facilities",
    buildingId: "building1",
  },
  {
    id: "building101",
    name: "101号館",
    type: "building",
    lat: 1148,
    lng: 2300,
    description: "Building 101 - Educational facilities",
    buildingId: "building101",
  },
  {
    id: "building2",
    name: "2号館",
    type: "building",
    lat: 921,
    lng: 1095,
    description: "Building 2 - General facilities",
    buildingId: "building2",
  },
  {
    id: "building5",
    name: "5号館",
    type: "building",
    lat: 1558,
    lng: 1488,
    description: "Building 5 - Faculty offices and classrooms",
    buildingId: "building5",
  },
  {
    id: "building7",
    name: "7号館",
    type: "building",
    lat: 1401,
    lng: 1645,
    description: "Building 7 - Laboratory facilities",
    buildingId: "building7",
  },
  {
    id: "building8",
    name: "8号館",
    type: "building",
    lat: 1393,
    lng: 2073,
    description: "Building 8 - Research facilities",
    buildingId: "building8",
  },
  {
    id: "building9",
    name: "9号館",
    type: "building",
    lat: 1569,
    lng: 1974,
    description: "Building 9 - General facilities",
    buildingId: "building9",
  },
  {
    id: "building10",
    name: "10号館",
    type: "building",
    lat: 1400,
    lng: 1824,
    description: "Building 10 - Department offices",
    buildingId: "building10",
  },
  {
    id: "building11",
    name: "11号館",
    type: "building",
    lat: 1104,
    lng: 1567,
    description: "Building 11 - Lecture halls and classrooms",
    buildingId: "building11",
  },
  {
    id: "building12",
    name: "12号館",
    type: "building",
    lat: 1017,
    lng: 1267,
    description: "Building 12 - Faculty facilities",
    buildingId: "building12",
  },
  {
    id: "building13",
    name: "13号館",
    type: "building",
    lat: 1169,
    lng: 1314,
    description: "Building 13 - Department facilities",
    buildingId: "building13",
  },
  {
    id: "building14",
    name: "14号館",
    type: "building",
    lat: 1122,
    lng: 1075,
    description: "Building 14 - Faculty facilities",
    buildingId: "building14",
  },
  {
    id: "building15",
    name: "15号館",
    type: "building",
    lat: 1409,
    lng: 816,
    description: "Building 15 - Faculty offices",
    buildingId: "building15",
  },
  {
    id: "building16",
    name: "16号館",
    type: "building",
    lat: 1607,
    lng: 881,
    description: "Building 16 - Research laboratories",
    buildingId: "building16",
  },
  {
    id: "building17",
    name: "17号館",
    type: "building",
    lat: 1537,
    lng: 1222,
    description: "Building 17 - Educational facilities",
    buildingId: "building17",
  },
  {
    id: "building18",
    name: "18号館",
    type: "building",
    lat: 1640,
    lng: 1770,
    description: "Building 18 - Faculty offices",
    buildingId: "building18",
  },
  {
    id: "building19",
    name: "19号館",
    type: "building",
    lat: 2039,
    lng: 2628,
    description: "Building 19 - General facilities",
    buildingId: "building19",
  },
  {
    id: "building900",
    name: "900番講堂",
    type: "building",
    lat: 804,
    lng: 1457,
    description: "Lecture Hall 900 - Large lecture facilities",
    buildingId: "building900",
  },
  {
    id: "komcee_west",
    name: "21KOMCEE West",
    type: "building",
    lat: 1637,
    lng: 2226,
    description: "21KOMCEE West - Student housing and facilities",
    buildingId: "komcee_west",
  },
  {
    id: "komcee_east",
    name: "21KOMCEE East",
    type: "building",
    lat: 1533,
    lng: 2343,
    description: "21KOMCEE East - Student housing and facilities",
    buildingId: "komcee_east",
  },
  {
    id: "info_edu",
    name: "情報教育棟",
    type: "building",
    lat: 431,
    lng: 1603,
    description: "Information and Education Building - Computer labs",
    buildingId: "info_edu",
  },
  {
    id: "administration",
    name: "アドミニストレーション棟",
    type: "building",
    lat: 644,
    lng: 2242,
    description: "Administration Building - University offices",
    buildingId: "administration",
  },
  {
    id: "comipla_north",
    name: "コミプラ北館",
    type: "building",
    lat: 1350,
    lng: 2786,
    description: "Comipla North Building - General facilities",
    buildingId: "comipla_north",
  },
];

// Water server locations
export const searchableWaterServers: SearchableItem[] = [
  {
    id: "ws_library",
    name: "ウォーターサーバー (駒場図書館)",
    type: "waterServer",
    lat: 1560,
    lng: 1560,
    description: "Komaba Library 1F",
  },
  {
    id: "ws_comipla_1f",
    name: "ウォーターサーバー (コミプラ1F)",
    type: "waterServer",
    lat: 1351,
    lng: 2680,
    description: "Comipla 1F",
  },
  {
    id: "ws_comipla_2f",
    name: "ウォーターサーバー (コミプラ2F)",
    type: "waterServer",
    lat: 1351,
    lng: 2650,
    description: "Comipla 2F",
  },
  {
    id: "ws_campus_plaza",
    name: "ウォーターサーバー (キャンパスプラザ)",
    type: "waterServer",
    lat: 1494,
    lng: 2823,
    description: "Campus Plaza A Building 1F",
  },
  {
    id: "ws_gym_1f",
    name: "ウォーターサーバー (第二体育館1F)",
    type: "waterServer",
    lat: 1529,
    lng: 2688,
    description: "2nd Gymnasium 1F",
  },
  {
    id: "ws_gym_2f",
    name: "ウォーターサーバー (第二体育館2F)",
    type: "waterServer",
    lat: 1567,
    lng: 2689,
    description: "2nd Gymnasium 2F",
  },
  {
    id: "ws_gym_main",
    name: "ウォーターサーバー (第一体育館)",
    type: "waterServer",
    lat: 1668,
    lng: 2991,
    description: "1st Gymnasium 2F",
  },
  {
    id: "ws_bldg8",
    name: "ウォーターサーバー (8号館)",
    type: "waterServer",
    lat: 1390,
    lng: 2065,
    description: "Building 8 1F",
  },
  {
    id: "ws_komcee",
    name: "ウォーターサーバー (21KOMCEE)",
    type: "waterServer",
    lat: 1645,
    lng: 2200,
    description: "21 KOMCEE West B1F",
  },
  {
    id: "ws_bldg5",
    name: "ウォーターサーバー (5号館)",
    type: "waterServer",
    lat: 1026,
    lng: 2812,
    description: "Building 5 1F",
  },
  {
    id: "ws_bldg13",
    name: "ウォーターサーバー (13号館)",
    type: "waterServer",
    lat: 1160,
    lng: 1318,
    description: "Building 13 1F",
  },
  {
    id: "ws_bldg15",
    name: "ウォーターサーバー (15号館)",
    type: "waterServer",
    lat: 1500,
    lng: 860,
    description: "Building 15 1F",
  },
  {
    id: "ws_coop",
    name: "ウォーターサーバー (購買部)",
    type: "waterServer",
    lat: 1340,
    lng: 2788,
    description: "Co-op Purchasing Department",
  },
  {
    id: "ws_math",
    name: "ウォーターサーバー (数理科学研究棟)",
    type: "waterServer",
    lat: 505,
    lng: 2826,
    description: "Mathematical Science Research Building 1F",
  },
];

// Vending machine locations
export const searchableVendingMachines: SearchableItem[] = [
  {
    id: "vm_1",
    name: "自動販売機",
    type: "vendingMachine",
    lat: 1097,
    lng: 1504,
  },
  {
    id: "vm_2",
    name: "自動販売機",
    type: "vendingMachine",
    lat: 1096,
    lng: 1625,
  },
  {
    id: "vm_3",
    name: "自動販売機",
    type: "vendingMachine",
    lat: 1762,
    lng: 2443,
  },
  {
    id: "vm_4",
    name: "自動販売機",
    type: "vendingMachine",
    lat: 1686,
    lng: 2536,
  },
];

// Combined searchable items
export const allSearchableItems: SearchableItem[] = [
  ...searchableBuildings,
  ...searchableWaterServers,
  ...searchableVendingMachines,
];

// Search function
export function searchItems(query: string): SearchableItem[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();

  return allSearchableItems.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(lowerQuery);
    const descMatch = item.description?.toLowerCase().includes(lowerQuery);
    const idMatch = item.id.toLowerCase().includes(lowerQuery);

    return nameMatch || descMatch || idMatch;
  });
}
