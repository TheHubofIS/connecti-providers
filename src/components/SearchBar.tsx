
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { categories } from "@/utils/serviceData";

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  selectedCategory?: string;
}

export default function SearchBar({ onSearch, selectedCategory = "all" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-secondary/30 rounded-xl p-2 shadow-md neo flex flex-col md:flex-row gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un service ou un prestataire..."
          className="w-full py-3 pl-10 pr-4 bg-transparent rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      <select
        className="py-3 px-4 border border-input rounded-lg bg-transparent focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all md:w-auto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      
      <button
        type="submit"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center"
      >
        Rechercher
      </button>
    </form>
  );
}
