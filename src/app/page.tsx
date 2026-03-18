"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Terminal, Wifi, Battery, Keyboard, Monitor, ExternalLink, CheckCircle2, XCircle, Info } from "lucide-react";

interface Device {
  id: string;
  name: string;
  price: string;
  description: string;
  openclawStatus: "excellent" | "good" | "limited" | "no";
  openclawNotes: string;
  specs: { screen: string; keyboard: string; connectivity: string; battery: string };
  links?: { url: string; label: string }[];
}

const devices: Device[] = [
  { id: "mac-mini", name: "Apple Mac Mini", price: "$599+", description: "The ultimate OpenClaw home server. Powerful, silent, and always-on capable. M4 chip handles agent workloads with ease.", openclawStatus: "excellent", openclawNotes: "Native support. Runs 24/7 with minimal power. Great for headless operation.", specs: { screen: "None (headless)", keyboard: "External USB/Bluetooth", connectivity: "WiFi 6E + Ethernet", battery: "N/A (wall powered)" }, links: [{ url: "https://www.apple.com/mac-mini/", label: "Apple" }] },
  { id: "macbook-air", name: "Apple MacBook Air", price: "$949+", description: "Portable option with excellent battery life. Great for taking your agent on the go.", openclawStatus: "excellent", openclawNotes: "Lid closed mode works great. Can wake for tasks then sleep. Excellent standby.", specs: { screen: "13.6\" Liquid Retina", keyboard: "Built-in Magic Keyboard", connectivity: "WiFi 6E + Bluetooth 5.3", battery: "Up to 18 hours" }, links: [{ url: "https://www.apple.com/macbook-air/", label: "Apple" }] },
  { id: "nuc", name: "Intel/ASUS NUC", price: "$300-800", description: "Compact x86 mini PCs. Great for running full Linux environments.", openclawStatus: "excellent", openclawNotes: "Full Linux support. Great for self-hosting. Small footprint fits anywhere.", specs: { screen: "None (headless)", keyboard: "External USB/Bluetooth", connectivity: "WiFi + Ethernet", battery: "N/A (wall powered)" } },
  { id: "raspberry-pi", name: "Raspberry Pi 5", price: "$80+", description: "Affordable ARM single-board computer. Perfect for lightweight deployments.", openclawStatus: "good", openclawNotes: "Works well for light workloads. Limited RAM (8GB max). Good for prototypes.", specs: { screen: "None (headless)", keyboard: "External USB", connectivity: "WiFi + Ethernet", battery: "N/A (wall powered)" } },
  { id: "freewrite", name: "Astrohaus Freewrite", price: "$649", description: "Distraction-free writing machine with e-ink display.", openclawStatus: "limited", openclawNotes: "Not a general-purpose computer. Locked down OS. Can't run full OpenClaw.", specs: { screen: "6\" E-ink", keyboard: "Mechanical (full-size)", connectivity: "WiFi", battery: "Weeks" } },
  { id: "freewrite-alpha", name: "Astrohaus Alpha", price: "$349", description: "Modern budget writerdeck.", openclawStatus: "limited", openclawNotes: "Not a general-purpose computer. Locked down OS.", specs: { screen: "6\" E-ink", keyboard: "Chiclet (WASD arrows)", connectivity: "WiFi", battery: "Weeks" } },
  { id: "remarkable", name: "reMarkable Paper Tablet", price: "$498+", description: "E-ink tablet for notes and writing.", openclawStatus: "no", openclawNotes: "Cannot run custom software. Linux-based but locked.", specs: { screen: "10.3\" E-ink", keyboard: "Type Folio add-on", connectivity: "WiFi", battery: "Weeks" } },
  { id: "micro-journal", name: "Micro Journal", price: "$139-269", description: "Open source e-ink writerdeck made in Italy.", openclawStatus: "no", openclawNotes: "Open source hardware but runs custom firmware. Not a general-purpose computer.", specs: { screen: "E-ink", keyboard: "Mechanical", connectivity: "USB-C", battery: "Rechargeable" } },
  { id: "alphasmart-neo", name: "Alphasmart Neo", price: "$40-80", description: "Vintage budget writerdeck from the 90s.", openclawStatus: "no", openclawNotes: "Cannot run any software. Text transfers via keyboard emulation only.", specs: { screen: "4-line LCD", keyboard: "Full-size", connectivity: "None", battery: "AAs (forever)" } },
  { id: "kingjim-pomera", name: "KingJim Pomera DM250", price: "~$400", description: "Japanese digital memo device.", openclawStatus: "no", openclawNotes: "Proprietary OS. Cannot run custom software.", specs: { screen: "7\" LCD", keyboard: "Full-size with arrows", connectivity: "WiFi", battery: "Rechargeable" } },
  { id: "framework-laptop", name: "Framework Laptop", price: "$599+", description: "Modular, repairable laptop with full Linux support.", openclawStatus: "excellent", openclawNotes: "Fully open design. Linux works perfectly. Upgradeable. Great keyboard.", specs: { screen: "13.5\" or 16\" IPS", keyboard: "Mechanical (user swappable)", connectivity: "WiFi 6E", battery: "All-day" }, links: [{ url: "https://frame.work", label: "Framework" }] },
  { id: "steam-deck", name: "Valve Steam Deck", price: "$349+", description: "Handheld gaming PC that runs Linux.", openclawStatus: "excellent", openclawNotes: "Runs SteamOS or full desktop Linux. Can SSH in and run agents. Fun form factor.", specs: { screen: "7\" LCD (1280x800)", keyboard: "On-screen + controllers", connectivity: "WiFi + Bluetooth", battery: "2-8 hours" } },
  { id: "ayaneo", name: "AYANEO Handhelds", price: "$300-900", description: "Windows handheld PCs.", openclawStatus: "excellent", openclawNotes: "Full Windows or Linux. Great for portable agent work.", specs: { screen: "6\"-7\" AMOLED", keyboard: "On-screen", connectivity: "WiFi + Bluetooth", battery: "2-6 hours" } },
];

const statusConfig = {
  excellent: { label: "Excellent", color: "bg-green-500", icon: CheckCircle2, description: "Native support, runs great" },
  good: { label: "Good", color: "bg-blue-500", icon: CheckCircle2, description: "Works well with some limitations" },
  limited: { label: "Limited", color: "bg-yellow-500", icon: Info, description: "Can run some things, not full OpenClaw" },
  no: { label: "Not Supported", color: "bg-red-500", icon: XCircle, description: "Cannot run OpenClaw" }
};

function StatusBadge({ status }: { status: Device["openclawStatus"] }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Tooltip>
      <TooltipTrigger><Badge className={`${config.color} text-white hover:${config.color}`}><Icon className="w-3 h-3 mr-1" />{config.label}</Badge></TooltipTrigger>
      <TooltipContent><p>{config.description}</p></TooltipContent>
    </Tooltip>
  );
}

function DeviceCard({ device }: { device: Device }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{device.name}</CardTitle>
          <StatusBadge status={device.openclawStatus} />
        </div>
        <CardDescription className="text-primary font-semibold">{device.price}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{device.description}</p>
        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">OpenClaw Compatibility</p>
          <p className="text-sm">{device.openclawNotes}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground"><Monitor className="w-4 h-4" /><span>{device.specs.screen}</span></div>
          <div className="flex items-center gap-2 text-muted-foreground"><Keyboard className="w-4 h-4" /><span>{device.specs.keyboard}</span></div>
          <div className="flex items-center gap-2 text-muted-foreground"><Wifi className="w-4 h-4" /><span>{device.specs.connectivity}</span></div>
          <div className="flex items-center gap-2 text-muted-foreground"><Battery className="w-4 h-4" /><span>{device.specs.battery}</span></div>
        </div>
        {device.links && (
          <div className="flex gap-2 pt-2">
            {device.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                <ExternalLink className="w-3 h-3" />{link.label}
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const filteredDevices = devices.filter((d) => {
    if (activeTab === "all") return true;
    return d.openclawStatus === activeTab;
  });
  const counts = { excellent: devices.filter(d => d.openclawStatus === "excellent").length, good: devices.filter(d => d.openclawStatus === "good").length, limited: devices.filter(d => d.openclawStatus === "limited").length, no: devices.filter(d => d.openclawStatus === "no").length };

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"><Terminal className="w-6 h-6 text-white" /></div>
              <div><h1 className="text-xl font-bold">PigRepresentative</h1><p className="text-xs text-muted-foreground">WriterDecks for OpenClaw</p></div>
            </div>
            <a href="https://github.com/sbhavani/pigrepresentative" className="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
          </div>
        </div>
      </header>
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Run OpenClaw on Dedicated Hardware</h2>
          <p className="text-lg text-muted-foreground mb-8">A curated guide to devices that can run your personal AI agent. From powerful home servers to portable companions.</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span>Excellent ({counts.excellent})</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span>Good ({counts.good})</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span>Limited ({counts.limited})</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span>Not Supported ({counts.no})</span></div>
          </div>
        </div>
      </section>
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8 flex flex-wrap h-auto gap-2 bg-transparent p-0">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">All Devices ({devices.length})</TabsTrigger>
              <TabsTrigger value="excellent" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Excellent ({counts.excellent})</TabsTrigger>
              <TabsTrigger value="good" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">Good ({counts.good})</TabsTrigger>
              <TabsTrigger value="limited" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Limited ({counts.limited})</TabsTrigger>
              <TabsTrigger value="no" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Not Supported ({counts.no})</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevices.map((device) => <DeviceCard key={device.id} device={device} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Inspired by <a href="https://openhardware.directory" className="text-primary hover:underline">openhardware.directory</a></p>
        </div>
      </footer>
    </div>
  );
}
