import React, { useState, useEffect, useCallback } from "react";
import "./AssignmentFour.css";

function AssignmentFour() {
  const [addressData, setAddressData] = useState({
    regions: [],
    provinces: [],
    cities: [],
    barangays: [],
    selectedRegion: "",
    selectedProvince: "",
    selectedCity: "",
    selectedBarangay: "",
    zipCode: "",
    otherAddress: "",
  });

  const [displayAddress, setDisplayAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** Fetch Data Utility Function */
  const fetchData = useCallback(async (url, stateKey) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Unexpected response format");
      setAddressData((prev) => ({ ...prev, [stateKey]: data }));
    } catch (err) {
      console.error(`Error fetching ${stateKey}:`, err);
      setError(`Failed to fetch ${stateKey}. Please try again.`);
    }
  }, []);

  /** Fetch Regions on Mount */
  useEffect(() => {
    fetchData("https://psgc.cloud/api/regions", "regions").finally(() =>
      setLoading(false)
    );
  }, [fetchData]);

  /** Handle Region Change */
  const handleRegionChange = async (e) => {
    const regionCode = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      selectedRegion: regionCode,
      selectedProvince: "",
      selectedCity: "",
      selectedBarangay: "",
      provinces: [],
      cities: [],
      barangays: [],
    }));

    if (regionCode) await fetchData(`https://psgc.cloud/api/regions/${regionCode}/provinces`, "provinces");
  };

  /** Handle Province Change */
  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      selectedProvince: provinceCode,
      selectedCity: "",
      selectedBarangay: "",
      cities: [],
      barangays: [],
    }));

    if (provinceCode) await fetchData(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`, "cities");
  };

  /** Handle City Change */
  const handleCityChange = async (e) => {
    const cityCode = e.target.value;
    setAddressData((prev) => ({
      ...prev,
      selectedCity: cityCode,
      selectedBarangay: "",
      barangays: [],
    }));

    if (cityCode) await fetchData(`https://psgc.cloud/api/municipalities/${cityCode}/barangays`, "barangays");
  };

  /** Handle Confirmation */
  const handleConfirm = () => {
    const { selectedRegion, selectedProvince, selectedCity, selectedBarangay, zipCode, otherAddress } = addressData;
    if (!selectedRegion || !selectedProvince || !selectedCity || !selectedBarangay || !zipCode) {
      alert("Please fill out all required fields.");
      return;
    }

    const findName = (list, code) => list.find((item) => item.code === code)?.name || "Unknown";

    setDisplayAddress(
      `${otherAddress ? otherAddress + ", " : ""}${findName(addressData.barangays, selectedBarangay)}, 
      ${findName(addressData.cities, selectedCity)}, ${findName(addressData.provinces, selectedProvince)}, 
      ${findName(addressData.regions, selectedRegion)}, ${zipCode}, Philippines.`
    );
  };

  return (
    <div className="address-container">
      <div className="address-wrapper">
        <div className="title-container">
          <h1>My Address</h1>
          <p>Fetch and display address data dynamically using an API.</p>
        </div>

        {loading && <p>Loading address data...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <>
            {displayAddress && <div className="address-display">{displayAddress}</div>}

            <div className="form-group">
              <label htmlFor="region">Region</label>
              <select id="region" value={addressData.selectedRegion} onChange={handleRegionChange}>
                <option value="">Select a Region</option>
                {addressData.regions.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="province">Province</label>
              <select
                id="province"
                value={addressData.selectedProvince}
                onChange={handleProvinceChange}
                disabled={!addressData.provinces.length}
              >
                <option value="">Select a Province</option>
                {addressData.provinces.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city">City/Municipality</label>
              <select
                id="city"
                value={addressData.selectedCity}
                onChange={handleCityChange}
                disabled={!addressData.cities.length}
              >
                <option value="">Select a City</option>
                {addressData.cities.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="barangay">Barangay</label>
              <select
                id="barangay"
                value={addressData.selectedBarangay}
                onChange={(e) => setAddressData((prev) => ({ ...prev, selectedBarangay: e.target.value }))}
                disabled={!addressData.barangays.length}
              >
                <option value="">Select a Barangay</option>
                {addressData.barangays.map(({ code, name }) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                id="zipCode"
                type="text"
                value={addressData.zipCode}
                onChange={(e) => setAddressData((prev) => ({ ...prev, zipCode: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label htmlFor="otherAddress">Other Address (Optional)</label>
              <input
                id="otherAddress"
                type="text"
                value={addressData.otherAddress}
                onChange={(e) => setAddressData((prev) => ({ ...prev, otherAddress: e.target.value }))}
              />
            </div>

            <button onClick={handleConfirm}>Confirm</button>
          </>
        )}
      </div>
    </div>
  );
}

export default AssignmentFour;