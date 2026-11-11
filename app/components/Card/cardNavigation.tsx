type CardTab = "event" | "about";

interface CardNavigationProps {
  activeTab: CardTab;
  onTabChange: (tab: CardTab) => void;
}
const cardNavigationMenu: { id: CardTab; name: string }[] = [
  { id: "event", name: "Event" },
  { id: "about", name: "About" },
];

const CardNavigation = ({ activeTab, onTabChange }: CardNavigationProps) => {
  return (
    <div className="flex gap-6 border-b border-gray-200">
      {cardNavigationMenu.map((nav) => (
        <button
          role="tab"
          key={nav.id}
          type="button"
          aria-selected={activeTab === nav.id}
          aria-controls={`panel-${nav.id}`}
          onClick={() => onTabChange(nav.id)}
          className={`pb-3 card-navigation transition-colors ${
            activeTab === nav.id
              ? "border-b-2 border-gray-800"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          {nav.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CardNavigation;
