import { useParams, Link } from "react-router-dom";
import * as im from "../assets";

interface BuildingInfo {
  id: string;
  name: string;
  image?: string; // SVG未定義も許容
  description: string;
}

const buildings: Record<string, BuildingInfo> = {
  building1: {
    id: "building1",
    name: "1号館",
    image: im.Building1,
    description: "Building 1 - Information and educational facilities",
  },
  building2: {
    id: "building2",
    name: "2号館",
    // image: im.Building2,
    description: "Building 2 - General facilities",
  },
  building5: {
    id: "building5",
    name: "5号館",
    image: im.Building5,
    description: "Building 5 - Faculty offices and classrooms",
  },
  building7: {
    id: "building7",
    name: "7号館",
    image: im.Building7,
    description: "Building 7 - Laboratory facilities",
  },
  building8: {
    id: "building8",
    name: "8号館",
    image: im.Building8,
    description: "Building 8 - Research facilities",
  },
  building9: {
    id: "building9",
    name: "9号館",
    // image: im.Building9,
    description: "Building 9 - General facilities",
  },
  building10: {
    id: "building10",
    name: "10号館",
    image: im.Building10,
    description: "Building 10 - Department offices",
  },
  building11: {
    id: "building11",
    name: "11号館",
    image: im.Building11,
    description: "Building 11 - Lecture halls and classrooms",
  },
  building12: {
    id: "building12",
    name: "12号館",
    image: im.Building12,
    description: "Building 12 - Faculty facilities",
  },
  building13: {
    id: "building13",
    name: "13号館",
    image: im.Building13,
    description: "Building 13 - Department facilities",
  },
  building14: {
    id: "building14",
    name: "14号館",
    // image: im.Building14,
    description: "Building 14 - Faculty facilities",
  },
  building101: {
    id: "building101",
    name: "101号館",
    // image: im.Building101,
    description: "Building 101 - Educational facilities",
  },
  building15: {
    id: "building15",
    name: "15号館",
    image: im.Building15,
    description: "Building 15 - Faculty offices",
  },
  building16: {
    id: "building16",
    name: "16号館",
    image: im.Building16,
    description: "Building 16 - Research laboratories",
  },
  building17: {
    id: "building17",
    name: "17号館",
    image: im.Building17,
    description: "Building 17 - Educational facilities",
  },
  building18: {
    id: "building18",
    name: "18号館",
    image: im.Building18,
    description: "Building 18 - Faculty offices",
  },
  building19: {
    id: "building19",
    name: "19号館",
    // image: im.Building19,
    description: "Building 19 - General facilities",
  },
  building900: {
    id: "building900",
    name: "900番講堂",
    image: im.Building900,
    description: "Lecture Hall 900 - Large lecture facilities",
  },
  komcee_west: {
    id: "komcee_west",
    name: "21KOMCEE West",
    image: im.KOMCEEWest,
    description: "21KOMCEE West - Student housing and facilities",
  },
  komcee_east: {
    id: "komcee_east",
    name: "21KOMCEE East",
    image: im.KOMCEEEast,
    description: "21KOMCEE East - Student housing and facilities",
  },
  info_edu: {
    id: "info_edu",
    name: "情報教育棟",
    image: im.InfoEduBuild,
    description: "Information and Education Building - Computer labs",
  },
  administration: {
    id: "administration",
    name: "アドミニストレーション棟",
    image: im.AdministrationOffice,
    description: "Administration Building - University offices",
  },
  comipla_north: {
    id: "comipla_north",
    name: "コミプラ北館",
    image: im.ComiplaNorthBuilding,
    description: "Communication Plaza North Building - General facilities",
  },
  library: {
    id: "library",
    name: "図書館",
    // image: im.Library,
    description: "Library - Study facilities and resources",
  },
};

export function BuildingPage() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const building = buildingId ? buildings[buildingId] : null;

  if (!building) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Building not found</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Back to Map
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2">{building.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{building.description}</p>
          </div>

          <div className="px-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">階層図</h2>
          </div>

          <div
            className="bg-gray-200 overflow-auto"
            style={{ maxHeight: "600px" }}
          >
            {building.image ? (
              <img
                src={building.image}
                alt={building.name}
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center text-gray-500 text-lg">
                階層図が見当たりません。
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="p-4 bg-gray-100 rounded">
              <h3 className="text-lg font-semibold mb-2">フロア情報</h3>
              <p className="text-gray-600">
                各階の教室や施設の詳細については、上の階層図をご参照ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
