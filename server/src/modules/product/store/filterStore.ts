import fs from "fs";
import path from "path";

export interface CategoryFilterItem {
  name: string;
  key: string;
  count?: number;
}

export interface ColorFilterItem {
  name: string;
  hex: string;
}

export interface FilterSettingsData {
  categories: CategoryFilterItem[];
  colors: ColorFilterItem[];
  sizes: string[];
  maxPrice: number;
}

const DEFAULT_FILTER_SETTINGS: FilterSettingsData = {
  categories: [
    { name: "BRALETTES", key: "Bralettes", count: 10 },
    { name: "EVERYDAY BRAS", key: "Everyday Bras", count: 8 },
    { name: "SEAMLESS PANTIES", key: "Seamless Panties", count: 8 },
    { name: "SILICONE COVERS", key: "Accessories", count: 7 },
    { name: "CONTOUR SHAPEWEAR", key: "Shapewear", count: 7 },
  ],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Nude Beige", hex: "#F5F5DC" },
    { name: "Classic White", hex: "#FFFFFF" },
    { name: "Blush Pink", hex: "#FFB6C1" },
    { name: "Dusty Rose", hex: "#D8A7B1" },
  ],
  sizes: ["S", "M", "L", "XL", "32B", "34B", "36B", "36C"],
  maxPrice: 3000,
};

const DB_FILE_PATH = path.join(process.cwd(), "filters_db.json");

class FilterStore {
  private filterData: FilterSettingsData = { ...DEFAULT_FILTER_SETTINGS };

  constructor() {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          this.filterData = {
            categories: Array.isArray(parsed.categories) && parsed.categories.length > 0 ? parsed.categories : DEFAULT_FILTER_SETTINGS.categories,
            colors: Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : DEFAULT_FILTER_SETTINGS.colors,
            sizes: Array.isArray(parsed.sizes) && parsed.sizes.length > 0 ? parsed.sizes : DEFAULT_FILTER_SETTINGS.sizes,
            maxPrice: Number(parsed.maxPrice) || 3000,
          };
          return;
        }
      }
    } catch (e) {
      console.warn("[FilterStore] Could not read filters_db.json, using defaults.");
    }
    this.filterData = { ...DEFAULT_FILTER_SETTINGS };
    this.saveToDisk();
  }

  private saveToDisk() {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.filterData, null, 2), "utf-8");
    } catch (e) {
      console.error("[FilterStore] Failed to write filters_db.json:", e);
    }
  }

  public getFilters(): FilterSettingsData {
    return this.filterData;
  }

  public updateFilters(newFilters: Partial<FilterSettingsData>): FilterSettingsData {
    this.filterData = {
      categories: Array.isArray(newFilters.categories) ? newFilters.categories : this.filterData.categories,
      colors: Array.isArray(newFilters.colors) ? newFilters.colors : this.filterData.colors,
      sizes: Array.isArray(newFilters.sizes) ? newFilters.sizes : this.filterData.sizes,
      maxPrice: Number(newFilters.maxPrice) || this.filterData.maxPrice,
    };
    this.saveToDisk();
    return this.filterData;
  }
}

export const filterStore = new FilterStore();
