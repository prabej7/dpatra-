import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';

interface Props {
  onSearch: (coords: { lat: number; lng: number }) => void;
}

const Search: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1e02dc5e630c241114c0a27b793012d7`,
    );
    const { lat, lon: lng } = data.coord;
    onSearch({ lat, lng });
  };

  return (
    <div className="absolute z-10 left-[38%] top-6 gap-6 flex">
      <Input
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search City"
        className="bg-white"
      />
      <Button onClick={handleSearch} variant="pri">
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
