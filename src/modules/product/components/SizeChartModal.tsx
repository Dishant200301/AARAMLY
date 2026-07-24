import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiInfo } from "react-icons/fi";
import { SizeChartEntry } from "../types/product";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../core/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "../../core/components/ui/tabs";
import { Badge } from "../../core/components/ui/badge";
import { Button } from "../../core/components/ui/button";

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  sizeChart: SizeChartEntry[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

type CountryTab = "India" | "USA" | "EU" | "UK" | "China";
type Unit = "cm" | "in";

export const SizeChartModal: React.FC<SizeChartModalProps> = ({
  isOpen,
  onClose,
  sizeChart,
  selectedSize,
  onSelectSize,
}) => {
  const [activeTab, setActiveTab] = useState<CountryTab>("India");
  const [unit, setUnit] = useState<Unit>("cm");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const countryLabels: Record<CountryTab, string> = {
    India: "IN Regular",
    USA: "US / CAN",
    EU: "EU Standard",
    UK: "UK Standard",
    China: "CN Standard",
  };

  const getCountrySizeKey = (tab: CountryTab): keyof SizeChartEntry => {
    switch (tab) {
      case "India":
        return "inSize";
      case "USA":
        return "usSize";
      case "EU":
        return "euSize";
      case "UK":
        return "ukSize";
      case "China":
        return "cnSize";
      default:
        return "inSize";
    }
  };

  const formatValue = (cmStr: string) => {
    if (!cmStr) return "-";
    if (unit === "cm") return `${cmStr} cm`;
    const parts = cmStr.split("-").map((s) => parseFloat(s.trim()));
    if (parts.some((n) => isNaN(n))) return cmStr;
    if (parts.length === 2) {
      const minIn = (parts[0] / 2.54).toFixed(1);
      const maxIn = (parts[1] / 2.54).toFixed(1);
      return `${minIn}" - ${maxIn}"`;
    }
    return `${(parts[0] / 2.54).toFixed(1)}"`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-zinc-200/80 my-auto flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-zinc-900 text-white">
                <FiInfo size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Size Guide & Conversion</h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Find your perfect fit with international size mapping
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200/60"
            >
              <FiX size={18} />
            </Button>
          </div>

          {/* Controls Bar: Country Tabs & Unit Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-zinc-100 bg-white">
            {/* Country Standard Tabs using Shadcn Tabs UI */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as CountryTab)}>
              <TabsList className="bg-zinc-100/80 p-1 h-9">
                {(["India", "USA", "EU", "UK", "China"] as CountryTab[]).map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="text-xs px-3 py-1 font-semibold rounded-md data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-xs text-zinc-600 cursor-pointer"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Unit Switcher (cm vs in) */}
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/80 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  unit === "cm"
                    ? "bg-white text-zinc-900 shadow-2xs font-bold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => setUnit("in")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  unit === "in"
                    ? "bg-white text-zinc-900 shadow-2xs font-bold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                in
              </button>
            </div>
          </div>

          {/* Table Container using Shadcn Table UI */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            <div className="rounded-xl border border-zinc-200 overflow-hidden shadow-2xs bg-white">
              <Table>
                <TableHeader className="bg-zinc-100/90 sticky top-0 z-10">
                  <TableRow className="hover:bg-zinc-100/90">
                    <TableHead className="font-bold text-zinc-900 text-xs uppercase tracking-wider">Brand Size</TableHead>
                    <TableHead className="font-bold text-zinc-900 text-xs uppercase tracking-wider">{countryLabels[activeTab]}</TableHead>
                    <TableHead className="font-bold text-zinc-900 text-xs uppercase tracking-wider">Bust</TableHead>
                    <TableHead className="font-bold text-zinc-900 text-xs uppercase tracking-wider">Underbust</TableHead>
                    <TableHead className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-zinc-100 text-xs font-medium">
                  {sizeChart.map((row, idx) => {
                    const isSelected = selectedSize === row.brandSize;
                    const countryVal = row[getCountrySizeKey(activeTab)];

                    return (
                      <TableRow
                        key={idx}
                        onClick={() => {
                          onSelectSize(row.brandSize);
                          onClose();
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-zinc-900 text-white hover:bg-zinc-800 font-bold"
                            : "hover:bg-zinc-50 text-zinc-800"
                        }`}
                      >
                        <TableCell className="font-bold text-sm">
                          {row.brandSize}
                        </TableCell>
                        <TableCell>{countryVal}</TableCell>
                        <TableCell className={isSelected ? "text-zinc-200" : "text-zinc-600"}>
                          {formatValue(row.bustCm)}
                        </TableCell>
                        <TableCell className={isSelected ? "text-zinc-200" : "text-zinc-600"}>
                          {formatValue(row.underbustCm)}
                        </TableCell>
                        <TableCell className="text-right">
                          {isSelected ? (
                            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-none gap-1 font-bold text-[11px]">
                              <FiCheckCircle size={12} /> Selected
                            </Badge>
                          ) : (
                            <span className="text-xs text-zinc-400 hover:text-zinc-900 underline underline-offset-2">
                              Select
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* How to Measure Banner */}
            <div className="mt-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-zinc-900">
                <FiInfo className="text-zinc-700 shrink-0" size={15} />
                <span>How to measure for your ideal size:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-zinc-600">
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/60 shadow-2xs">
                  <span className="font-semibold text-zinc-900 block mb-0.5">1. Underbust</span>
                  <span>Measure tight directly under your bust around your ribcage where the band sits.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-zinc-200/60 shadow-2xs">
                  <span className="font-semibold text-zinc-900 block mb-0.5">2. Full Bust</span>
                  <span>Measure loosely around the fullest part of your bust while keeping tape straight.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-zinc-100 bg-zinc-50/70 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Selected Size: <strong className="text-zinc-900 uppercase font-bold">{selectedSize || "None"}</strong>
            </span>
            <Button
              onClick={onClose}
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-6 shadow-sm"
            >
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
