import { createContext, useContext, useState } from "react";
import { sampleGifts, samplePage, samplePledged } from "@/data/sampleData.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [gifts, setGifts] = useState(sampleGifts);
  const [page] = useState(samplePage);
  const [pledged, setPledged] = useState(samplePledged);
  const [donations, setDonations] = useState([]);

  const toggleGift = (id) =>
    setGifts((prev) => prev.map((g) => (g.id === id ? { ...g, selected: !g.selected } : g)));

  const addGift = (gift) =>
    setGifts((prev) => [...prev, { ...gift, id: `g${Date.now()}`, selected: true }]);

  const deleteGift = (id) =>
    setGifts((prev) => prev.filter((g) => g.id !== id));

  const recordDonation = (donation) => {
    setDonations((prev) => [...prev, { ...donation, id: `d${Date.now()}`, ts: new Date().toISOString() }]);
    setPledged((prev) => ({
      ...prev,
      [donation.giftId]: (prev[donation.giftId] || 0) + donation.amount,
    }));
  };

  return (
    <AppContext.Provider value={{ gifts, page, pledged, donations, toggleGift, addGift, deleteGift, recordDonation }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

