import { useState } from "react";
import {
  Cabinet,
  Equipment,
  InstalledEquipment,
  Project,
} from "./types";
import {
  mockCabinets,
  mockEquipment,
  categories,
} from "./data/mockData";
import { CabinetSelector } from "./components/CabinetSelector";
import { EquipmentCatalog } from "./components/EquipmentCatalog";
import { CabinetVisualization } from "./components/CabinetVisualization";
import { ParametersPanel } from "./components/ParametersPanel";
import { DocumentationPanel } from "./components/DocumentationPanel";
import { ProjectManager } from "./components/ProjectManager";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { Layout, Grid, FileText } from "lucide-react";

export default function App() {
  const [selectedCabinet, setSelectedCabinet] =
    useState<Cabinet>(mockCabinets[0]);
  const [installedEquipment, setInstalledEquipment] = useState<
    InstalledEquipment[]
  >([]);
  const [draggedEquipment, setDraggedEquipment] =
    useState<Equipment | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [currentProject, setCurrentProject] = useState<Project>(
    {
      id: `project-${Date.now()}`,
      name: "Новый проект",
      cabinet: selectedCabinet,
      equipment: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  );

  const handleDragStart = (equipment: Equipment) => {
    setDraggedEquipment(equipment);
  };

  const checkIfCanPlace = (
    position: number,
    units: number,
  ): boolean => {
    // Проверка, что не выходим за пределы шкафа
    if (position + units - 1 > selectedCabinet.units) {
      return false;
    }

    // Проверка на пересечение с существующим оборудованием
    for (let i = position; i < position + units; i++) {
      const occupied = installedEquipment.some((eq) => {
        const start = eq.position;
        const end = eq.position + eq.equipment.units - 1;
        return i >= start && i <= end;
      });
      if (occupied) return false;
    }

    return true;
  };

  const handleDrop = (position: number) => {
    if (!draggedEquipment) return;

    if (!checkIfCanPlace(position, draggedEquipment.units)) {
      toast.error(
        "Невозможно разместить оборудование в этой позиции",
      );
      return;
    }

    const newInstalled: InstalledEquipment = {
      id: `installed-${Date.now()}`,
      equipment: draggedEquipment,
      position,
    };

    setInstalledEquipment((prev) => [...prev, newInstalled]);
    toast.success("Оборудование добавлено");
    setDraggedEquipment(null);
  };

  const handleRemove = (id: string) => {
    setInstalledEquipment((prev) =>
      prev.filter((eq) => eq.id !== id),
    );
    toast.success("Оборудование удалено");
  };

  const handleCabinetChange = (cabinet: Cabinet) => {
    setSelectedCabinet(cabinet);
    setInstalledEquipment([]);
    toast.info("Шкаф изменён, оборудование очищено");
  };

  const handleSaveProject = (project: Project) => {
    setCurrentProject(project);
  };

  const handleLoadProject = (project: Project) => {
    setCurrentProject(project);
    setSelectedCabinet(project.cabinet);
    setInstalledEquipment(project.equipment);
  };

  const handleNewProject = () => {
    setInstalledEquipment([]);
    setCurrentProject({
      id: `project-${Date.now()}`,
      name: "Новый проект",
      cabinet: selectedCabinet,
      equipment: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    toast.success("Создан новый проект");
  };

  const handleGenerateAll = () => {
    toast.success("Все документы готовы к скачиванию");
  };

  const handleDownload = (docId: string) => {
    toast.success("Документ загружен");
  };

  const handlePreview = (docId: string) => {
    // Preview handled in component
  };

  const handleExport = () => {
    toast.success("Проект экспортирован");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="border-b border-tech-blue/30 bg-gradient-to-r from-card to-muted/30 px-4 py-3 shadow-lg shadow-tech-blue/5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-tech-blue to-tech-cyan shadow-lg shadow-tech-blue/30">
                <Grid className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-tech-blue to-tech-cyan bg-clip-text text-transparent">
                Конфигуратор серверного шкафа
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 ml-12">
              {currentProject.name}
            </p>
          </div>
          <ProjectManager
            currentProject={{
              ...currentProject,
              cabinet: selectedCabinet,
              equipment: installedEquipment,
            }}
            onSave={handleSaveProject}
            onLoad={handleLoadProject}
            onNew={handleNewProject}
            onExport={handleExport}
          />
        </div>
      </header>

      {/* Main Content - Mobile First */}
      <main className="flex-1 overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[320px_1fr_320px] h-full">
          {/* Left Panel - Cabinet Selection & Catalog */}
          <div className="border-r bg-card p-4 overflow-hidden flex flex-col gap-6">
            <CabinetSelector
              cabinets={mockCabinets}
              selectedCabinet={selectedCabinet}
              onSelectCabinet={handleCabinetChange}
            />
            <div className="flex-1 overflow-hidden">
              <EquipmentCatalog
                equipment={mockEquipment}
                categories={categories}
                onDragStart={handleDragStart}
              />
            </div>
          </div>

          {/* Center Panel - Visualization */}
          <div className="p-6 overflow-hidden">
            <CabinetVisualization
              cabinet={selectedCabinet}
              installedEquipment={installedEquipment}
              onDrop={handleDrop}
              onRemove={handleRemove}
              dragOver={dragOver}
              setDragOver={setDragOver}
            />
          </div>

          {/* Right Panel - Parameters & Documentation */}
          <div className="border-l bg-card p-4 overflow-hidden flex flex-col">
            <Tabs
              defaultValue="params"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="params">
                  <Layout className="h-4 w-4 mr-2" />
                  Параметры
                </TabsTrigger>
                <TabsTrigger value="docs">
                  <FileText className="h-4 w-4 mr-2" />
                  Документы
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="params"
                className="flex-1 overflow-auto mt-0"
              >
                <ParametersPanel
                  cabinet={selectedCabinet}
                  installedEquipment={installedEquipment}
                />
              </TabsContent>
              <TabsContent
                value="docs"
                className="flex-1 overflow-hidden mt-0"
              >
                <DocumentationPanel
                  onGenerateAll={handleGenerateAll}
                  onDownload={handleDownload}
                  onPreview={handlePreview}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden h-full">
          <Tabs
            defaultValue="catalog"
            className="h-full flex flex-col"
          >
            <TabsList className="grid w-full grid-cols-4 shrink-0">
              <TabsTrigger
                value="catalog"
                className="text-xs px-2"
              >
                Каталог
              </TabsTrigger>
              <TabsTrigger
                value="cabinet"
                className="text-xs px-2"
              >
                Шкаф
              </TabsTrigger>
              <TabsTrigger
                value="params"
                className="text-xs px-2"
              >
                Параметры
              </TabsTrigger>
              <TabsTrigger
                value="docs"
                className="text-xs px-2"
              >
                Документы
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="catalog"
              className="flex-1 overflow-hidden p-4 mt-0"
            >
              <div className="h-full flex flex-col gap-4">
                <CabinetSelector
                  cabinets={mockCabinets}
                  selectedCabinet={selectedCabinet}
                  onSelectCabinet={handleCabinetChange}
                />
                <div className="flex-1 overflow-hidden">
                  <EquipmentCatalog
                    equipment={mockEquipment}
                    categories={categories}
                    onDragStart={handleDragStart}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="cabinet"
              className="flex-1 overflow-hidden p-4 mt-0"
            >
              <CabinetVisualization
                cabinet={selectedCabinet}
                installedEquipment={installedEquipment}
                onDrop={handleDrop}
                onRemove={handleRemove}
                dragOver={dragOver}
                setDragOver={setDragOver}
              />
            </TabsContent>

            <TabsContent
              value="params"
              className="flex-1 overflow-auto p-4 mt-0"
            >
              <ParametersPanel
                cabinet={selectedCabinet}
                installedEquipment={installedEquipment}
              />
            </TabsContent>

            <TabsContent
              value="docs"
              className="flex-1 overflow-hidden p-4 mt-0"
            >
              <DocumentationPanel
                onGenerateAll={handleGenerateAll}
                onDownload={handleDownload}
                onPreview={handlePreview}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}