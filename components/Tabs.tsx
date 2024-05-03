import classNames from "classnames";
import { useSearchParams } from "next/navigation";

const tabs = [
  { name: "Bookings", href: "?tab=bookings"},
  { name: "Waiting list", href: "?tab=waiting-list"},
];

const Tabs = () => {
  const params = useSearchParams();
  
  const currentTab = params.get('tab');

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              className={classNames(
                currentTab === tab.name.toLowerCase().replace(' ', '-')
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
              )}
              aria-current={currentTab === tab.name.toLowerCase().replace(' ', '-') ? "page" : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
