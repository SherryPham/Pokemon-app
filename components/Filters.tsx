"use client";
import { useGlobalContext } from "@/context/globalContext";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { CircleDot, Delete, Ruler, SortAsc, Weight, Zap } from "lucide-react";
import { Input } from "./ui/input";

const pokemonTypes = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const pokemonAbilities = [
  "Overgrow",
  "Blaze",
  "Torrent",
  "Shield Dust",
  "Shed Skin",
  "Compound Eyes",
  "Swarm",
  "Keen Eye",
  "Run Away",
  "Intimidate",
  "Static",
  "Sand Veil",
  "Synchronize",
  "Levitate",
  "Pressure",
  "Adaptability",
  "Multiscale",
  "Sturdy",
  "Inner Focus",
  "Guts",
];

function Filters() {
  const { handleFilterChange, filters, clearFilters } = useGlobalContext();
  return (
    <div className="mt-8 px-16 py-4 flex items-center justify-between">
      <div className="flex flex-wrap gap-4 items-center">
        <Select
          value={filters.type}
          onValueChange={(value) => handleFilterChange("type", value)}
        >
          <SelectTrigger
            className="u-shadow-2 w-[180px] text-gray-500 font-bold border-none bg-white rounded-lg
            focus:ring-2 focus:ring-gray-200"
          >
            <div className="flex items-center gap-1">
              <CircleDot className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Types" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {pokemonTypes.map((type, index: number) => (
              <SelectItem key={index} value={type.toLowerCase()} className="">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.ability}
          onValueChange={(value) => handleFilterChange("ability", value)}
        >
          <SelectTrigger
            className="u-shadow-2 w-[180px] text-gray-500 font-bold border-none bg-white rounded-lg
          focus:ring-2 focus:ring-gray-200"
          >
            <div className=" flex items-center gap-1">
              <Zap className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Abilities" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {pokemonAbilities.map((ability) => (
              <SelectItem key={ability} value={ability.toLowerCase()}>
                {ability}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

          <Input
            type="number"
            placeholder="Weight"
            value={filters.weight}
            className="u-shadow-2 w-[180px] pl-9 text-gray-500 font-bold border-none outline-none bg-white rounded-lg
            focus-visible:ring-2 focus-visible:ring-gray-200"
            onChange={(e) => handleFilterChange("weight", e.target.value)}
          />
        </div>

        <div className="relative">
          <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="number"
            placeholder="Height"
            value={filters.height}
            onChange={(e) => handleFilterChange("height", e.target.value)}
            className="u-shadow-2 w-[180px] pl-9 text-gray-500 font-bold border-none outline-none bg-white rounded-lg
            focus-visible:ring-2 focus-visible:ring-gray-200"
          />
        </div>

        <Select
          value={filters.sortOrder}
          onValueChange={(value) => handleFilterChange("sortOrder", value)}
        >
          <SelectTrigger
            className="u-shadow-2 w-[180px] text-gray-500 font-bold border-none bg-white rounded-lg
            focus:ring-2 focus:ring-gray-200"
          >
            <div className="flex items-center gap-1">
              <SortAsc className="mr-2 h-4 w-4 text-gray-400" />
              <SelectValue placeholder="Sort Order" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={clearFilters}
        className="u-shadow-2 font-bold bg-[#6c5ce7] rounded-lg flex items-center gap-1"
      >
        <Delete className="mr-2 h-5 w-5" />
        Clear Filters
      </Button>
    </div>
  );
}

export default Filters;
