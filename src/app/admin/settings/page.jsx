"use client";

import React, { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HexColorPicker } from "react-colorful";

// Fetching settings from the server
const fetchSettings = async () => {
  try {
    const response = await fetch(
      "http://localhost/lms-admin/settings/fetch_settings.php",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
};

// Information Section Component
const Informations = ({
  siteName,
  faviconPreview,
  logoPreview,
  phoneNumber,
  location,
  setSiteName,
  setFaviconPreview,
  setFaviconFile,
  setLogoPreview,
  setLogoFile,
  setPhoneNumber,
  setLocation,
  handleFileChange,
}) => (

  <div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Site Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Site Name */}
            <div className="relative w-full">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Site Name
              </label>
              <input
                type="text"
                className="border text-md rounded-md w-full px-3 py-2"
                placeholder="Enter Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="relative w-full">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Phone Number
              </label>
              <div className="flex items-center border rounded-md h-full w-full">
                <span className="pl-3 pr-0 py-2 text-md text-gray-600">+88</span>
                <input
                  type="text"
                  className="text-md h-full w-full px-3 py-2"
                  placeholder="01XXX-XXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="relative w-full">
              <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Address
              </label>
              <input
                type="text"
                className="border text-md rounded-md w-full px-3 py-2"
                placeholder="Enter Default Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>
     
    

          {/* Favicon & Logo Upload */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Favicon Upload */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon (Small Logo)
              </label>
              <div className="flex items-center">
                <div className="w-48 h-48 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center shadow-inner mr-4">
                {faviconPreview ? (
                  <img
                    src={faviconPreview}
                    alt="Favicon Preview"
                    className="w-full h-full object-cover shadow-lg"
                  />
                ) : (
                  <span className="text-gray-400">No Preview</span>
                )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="favicon-upload" className="cursor-pointer">
                  <input
                      id="favicon-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange(setFaviconPreview, setFaviconFile)} 
                    />
                    <div className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm">
                      Upload Favicon
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Logo Upload */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo
              </label>
              <div className="flex items-center">
                <div className="w-48 h-48 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center shadow-inner mr-4">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="w-full h-full object-cover shadow-lg"
                    />
                  ) : (
                    <span className="text-gray-400">No Preview</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange(setLogoPreview, setLogoFile)}
                    />
                    <div className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm">
                      Upload Logo
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Social Links Section Component
const SocialLinks = ({ socialMediaLinks, setSocialMediaLinks }) => (
  <div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Social Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((platform) => (
            <div key={platform} className="relative w-full flex items-center">
              {React.createElement(
                {
                  facebook: Facebook,
                  twitter: Twitter,
                  instagram: Instagram,
                  linkedin: Linkedin,
                  youtube: Youtube,
                }[platform],
                { className: "w-6 h-6 text-primary mr-3" }
              )}
              <input
                type="url"
                className="border text-md rounded-md w-full px-3 py-2"
                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                value={socialMediaLinks[platform]}
                onChange={(e) =>
                  setSocialMediaLinks({
                    ...socialMediaLinks,
                    [platform]: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Theme Section Component
const Theme = ({ colors, setColors }) => (
  <div>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Theme</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["primary", "background", "text", "accent"].map((colorType) => (
            <div key={colorType} className="relative w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {colorType.charAt(0).toUpperCase() + colorType.slice(1)} Color
              </label>
              <div className="flex items-center space-x-4">
                <HexColorPicker
                  color={colors[colorType]}
                  onChange={(color) => setColors({ ...colors, [colorType]: color })}
                />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border" style={{ backgroundColor: colors[colorType] }} />
                  <input
                    type="text"
                    className="border text-md rounded-md w-full px-3 py-2"
                    value={colors[colorType]}
                    onChange={(e) => setColors({ ...colors, [colorType]: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Main Settings Component
const Settings = () => {
  const [siteName, setSiteName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [faviconPreview, setFaviconPreview] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [faviconFile, setFaviconFile] = useState(null); // Add this
  const [logoFile, setLogoFile] = useState(null);       // Add this
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
  });
  const [colors, setColors] = useState({
    primary: "#000000",
    background: "#ffffff",
    text: "#000000",
    accent: "#f0f0f0",
  });

  // Fetch settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      const settingsData = await fetchSettings();
      if (settingsData) {
        setSiteName(settingsData.company_name || "");
        setPhoneNumber(settingsData.ad_phone || "");
        setLocation(settingsData.address || "");
        setSocialMediaLinks({
          facebook: settingsData.facebook || "",
          twitter: settingsData.twitter || "",
          instagram: settingsData.instagram || "",
          linkedin: settingsData.linkedin || "",
          youtube: settingsData.youtube || "",
        });
        setColors({
          primary: settingsData.primary_color || "#000000",
          background: settingsData.background_color || "#ffffff",
          text: settingsData.text_color || "#000000",
          accent: settingsData.accent_color || "#f0f0f0",
        });
        setFaviconPreview(settingsData.favicon || "");
        setLogoPreview(settingsData.logo || "");
      }
    };

    loadSettings();
  }, []);

  const handleFileChange = (setFilePreview, setFile) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
      setFile(file); // This sets the actual file to be uploaded
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    
    if (faviconFile) formData.append("favicon", faviconFile);
    if (logoFile) formData.append("logo", logoFile);
    
    formData.append("site_name", siteName);
    formData.append("phone_number", phoneNumber);
    formData.append("location", location);
    formData.append("colors", JSON.stringify(colors)); 
    formData.append("social_links", JSON.stringify(socialMediaLinks));

    try {
        const response = await fetch(
            "http://localhost/lms-admin/settings/edit_settings.php",
            {
                method: "POST",
                credentials: "include",
                body: formData, 
            }
        );
        const result = await response.json();
        if (result.success) {
            console.log("Settings saved successfully!");
        } else {
            console.error("Error saving settings:", result.message);
        }
    } catch (error) {
        console.error("Error saving settings:", error);
    }
};

  return (
    <div>
      <Tabs defaultValue="information" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="information" className="w-full">Information</TabsTrigger>
          <TabsTrigger value="theme" className="w-full">Theme</TabsTrigger>
          <TabsTrigger value="social" className="w-full">Social</TabsTrigger>
        </TabsList>
        <TabsContent value="information">
        <Informations
          siteName={siteName}
          faviconPreview={faviconPreview}
          logoPreview={logoPreview}
          phoneNumber={phoneNumber}
          location={location}
          setSiteName={setSiteName}
          setFaviconPreview={setFaviconPreview}
          setFaviconFile={setFaviconFile}
          setLogoFile={setLogoFile}
          setLogoPreview={setLogoPreview}
          setPhoneNumber={setPhoneNumber}
          setLocation={setLocation}
          handleFileChange={handleFileChange}
        />
        </TabsContent>
        <TabsContent value="theme">
          <Theme colors={colors} setColors={setColors} />
        </TabsContent>
        <TabsContent value="social">
          <SocialLinks
            socialMediaLinks={socialMediaLinks}
            setSocialMediaLinks={setSocialMediaLinks}
          />
        </TabsContent>
      </Tabs>
      <div className="w-full flex justify-end py-3">
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default Settings;
