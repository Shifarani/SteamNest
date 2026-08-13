import { useState } from "react";
import categories from "../../constants/categories";

const Categories = () => {
  const [active, setActive] = useState("All");

  return (
    <section className="bg-slate-50 py-6">
        <div className="flex gap-1"> {/*className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6 scrollbar-hide"*/}

        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300
              ${
                active === item
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-[var(--bg)]  text-[var(--text)] hover:bg-slate-900 hover:text-white"
              }`}
          >
            {item}
          </button>
        ))}

      </div>
    </section>
  );
};

export default Categories;   