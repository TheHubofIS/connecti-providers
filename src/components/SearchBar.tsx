
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <input
        type="text"
        placeholder="Rechercher un prestataire par nom, compétence ou localisation..."
        className="w-full pl-12 pr-4 py-3 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
