
import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ProviderFilters, { FilterOptions } from '@/components/ProviderFilters';
import PrestaireCard from '@/components/PrestaireCard';
import type { Provider } from '@/types/provider';

// Mock data
const mockProviders: Provider[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    title: 'Consultante en Stratégie Internationale',
    rating: 4.8,
    reviews: 127,
    location: 'Londres',
    image: '/placeholder.svg',
    category: 'Stratégie',
    subcategory: 'Business Development',
    skills: ['Stratégie', 'Business Development', 'Consulting'],
    hourlyRate: 120,
    availability: 'Disponible maintenant',
    languages: ['Français', 'Anglais'],
    responseTime: '< 2 heures',
    completionRate: 98,
    verified: true
  },
  {
    id: '2',
    name: 'Jean Dupont',
    title: 'Expert-Comptable International',
    rating: 4.9,
    reviews: 84,
    location: 'New York',
    image: '/placeholder.svg',
    category: 'Finance',
    subcategory: 'Comptabilité',
    skills: ['Finance', 'Comptabilité', 'Fiscalité'],
    hourlyRate: 150,
    availability: 'Cette semaine',
    languages: ['Français', 'Anglais', 'Espagnol'],
    responseTime: '< 4 heures',
    completionRate: 95,
    verified: true
  }
];

export default function Prestataires() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    location: 'all',
    rating: 'all',
    availability: 'all'
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-6">Trouvez le prestataire idéal</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProviderFilters onFilterChange={handleFilterChange} />
        </aside>

        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockProviders.map(provider => (
              <PrestaireCard key={provider.id} provider={provider} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
