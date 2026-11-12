type CardTab = "event" | "about";

interface CardNavigationProps {
  activeTab: CardTab;
  onTabChange: (tab: CardTab) => void;
}
const cardNavigationMenu: { id: CardTab; name: string }[] = [
  { id: "event", name: "Events" },
  { id: "about", name: "About" },
];

const CardNavigation = ({ activeTab, onTabChange }: CardNavigationProps) => {
  return (
    <div className="flex gap-6 border-b border-company-gray-200">
      {cardNavigationMenu.map((nav) => (
        <button
          key={nav.id}
          type="button"
          aria-pressed={activeTab === nav.id}
          onClick={() => onTabChange(nav.id)}
          className={`pb-3 card-navigation transition-colors 
            ${
              activeTab === nav.id
                ? "border-b-2 border-company-gray-600"
                : "text-company-gray-300 hover:text-company-gray-600"
            }
          `}
        >
          {nav.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CardNavigation;
