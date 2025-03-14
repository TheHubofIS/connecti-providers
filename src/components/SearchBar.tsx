
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { categories } from "@/utils/serviceData";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  selectedCategory?: string;
}

export default function SearchBar({ onSearch, selectedCategory = "all" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(selectedCategory);
  const { translate } = useLanguage();

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary/30 rounded-xl p-2 shadow-md neo flex flex-col md:flex-row gap-2 transition-all duration-300 hover:shadow-lg">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <input
          type="text"
          placeholder={translate('search.placeholder')}
          className="w-full py-3 pl-10 pr-4 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <select
        className="py-3 px-4 border border-input rounded-lg bg-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 md:w-auto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">{translate('search.categories')}</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      
      <button
        type="submit"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center hover:scale-105"
      >
        {translate('search.button')}
      </button>
    </form>
  );
}
