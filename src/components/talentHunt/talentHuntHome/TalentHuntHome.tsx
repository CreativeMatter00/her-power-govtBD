import CategoryPart from "./CategoryPart";
import HeadingPart from "./HeadingPart";
import TalentHero from "./TalentHero";
import FindTalents from "./FindTalents";
import ExpertTalents from "./ExpertTalents";

const categories = [
  { name: "Web Development", rating: 4.35, skills: 1157 },
  { name: "Graphic Design", rating: 4.87, skills: 1180 },
  { name: "Digital Marketing", rating: 4.51, skills: 825 },
  { name: "E-Commerce", rating: 4.7, skills: 1028 },
  { name: "IT Service", rating: 4.79, skills: 831 },
  { name: "Call Center Agent", rating: 4.65, skills: 1150 },
  { name: "Crafting", rating: 4.7, skills: 586 },
];

const experts = [
  {
    name: "Ripa Islam",
    title:
      "SEO and Digital Marketing Expert. Google Certified. Over 100 Projects complete.",
    location: "Dhaka",
    rating: 4.95,
    reviews: 119,
    recommendation: "Coder Trust",
    skills: ["Link Building", "Google Ranking"],
    projects: 147,
    hourlyRate: "BDT58/hr",
    image: " ", // Replace with your image paths
  },
  {
    name: "Sorna Sarkar",
    title:
      "SEO and Digital Marketing Expert. Google Certified. Over 100 Projects complete.",
    location: "Dhaka",
    rating: 4.95,
    reviews: 119,
    recommendation: "Coder Trust",
    skills: ["Link Building", "Google Ranking"],
    projects: 147,
    hourlyRate: "BDT58/hr",
    image:
      "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg",
  },
  {
    name: "Tasnova Alom",
    title:
      "SEO and Digital Marketing Expert. Google Certified. Over 100 Projects complete.",
    location: "Dhaka",
    rating: 4.95,
    reviews: 119,
    recommendation: "Coder Trust",
    skills: ["Link Building", "Google Ranking"],
    projects: 147,
    hourlyRate: "BDT58/hr",
    image:
      "/assets/images/talent-hunt/matheus-ferrero-W7b3eDUb_2I-unsplash.jpg",
  },
];

const TalentHuntHome = () => {
  return (
    <div className="pb-8">
      <HeadingPart />
      <TalentHero />
      <CategoryPart categories={categories} />
      <ExpertTalents experts={experts} />
      <FindTalents />
    </div>
  );
};

export default TalentHuntHome;
