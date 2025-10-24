import { useState } from 'react';
import { Document } from '../types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  FileText, 
  Download, 
  Eye, 
  FileSpreadsheet,
  Loader2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface DocumentationPanelProps {
  onGenerateAll: () => void;
  onDownload: (docId: string) => void;
  onPreview: (docId: string) => void;
}

const documentTypes: Document[] = [
  { id: 'spec', type: 'specification', name: 'Спецификация оборудования', status: 'pending' },
  { id: 'draw', type: 'drawing', name: 'Сборочный чертёж', status: 'pending' },
  { id: 'wire', type: 'wiring', name: 'Схема коммутации', status: 'pending' },
  { id: 'calc', type: 'calculation', name: 'Расчёт параметров', status: 'pending' },
  { id: 'comm', type: 'commercial', name: 'Коммерческое предложение', status: 'pending' },
  { id: 'note', type: 'notes', name: 'Пояснительная записка', status: 'pending' }
];

export function DocumentationPanel({ onGenerateAll, onDownload, onPreview }: DocumentationPanelProps) {
  const [documents, setDocuments] = useState<Document[]>(documentTypes);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAll = async () => {
    setIsGenerating(true);
    setDocuments(docs => docs.map(d => ({ ...d, status: 'generating' as const })));
    
    // Симуляция генерации документов
    for (let i = 0; i < documents.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDocuments(docs => docs.map((d, idx) => 
        idx === i ? { ...d, status: 'ready' as const } : d
      ));
    }
    
    setIsGenerating(false);
    onGenerateAll();
  };

  const handlePreview = (doc: Document) => {
    setPreviewDoc(doc);
    onPreview(doc.id);
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle2 className="h-4 w-4 text-tech-green" />;
      case 'generating':
        return <Loader2 className="h-4 w-4 animate-spin text-tech-blue" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'ready':
        return <Badge variant="default" className="bg-tech-green/20 text-tech-green border border-tech-green/30 shadow-md shadow-tech-green/20">Готов</Badge>;
      case 'generating':
        return <Badge variant="default" className="bg-tech-blue/20 text-tech-blue border border-tech-blue/30 shadow-md shadow-tech-blue/20 animate-pulse">Генерация...</Badge>;
      case 'pending':
        return <Badge variant="secondary">Ожидание</Badge>;
    }
  };

  const readyCount = documents.filter(d => d.status === 'ready').length;

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h3>Техническая документация</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Готово: {readyCount} из {documents.length}
        </p>
      </div>

      <Button 
        onClick={handleGenerateAll} 
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-tech-blue to-tech-cyan hover:from-tech-blue/90 hover:to-tech-cyan/90 shadow-lg shadow-tech-blue/30 transition-all duration-300 hover:shadow-xl hover:shadow-tech-blue/40"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Генерация документов...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Сгенерировать все документы
          </>
        )}
      </Button>

      <ScrollArea className="flex-1 -mx-4 px-4">
        <div className="space-y-3 pb-4">
          {documents.map(doc => (
            <div 
              key={doc.id} 
              className="group p-4 border border-border rounded-lg bg-gradient-to-br from-card to-card/50 hover:border-tech-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-tech-blue/10"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-muted/50 group-hover:bg-tech-blue/10 transition-colors">
                  {getStatusIcon(doc.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="truncate group-hover:text-tech-blue transition-colors">{doc.name}</span>
                    {getStatusBadge(doc.status)}
                  </div>
                  {doc.status === 'ready' && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(doc)}
                        className="h-8 hover:bg-tech-blue/10 hover:text-tech-blue hover:border-tech-blue/50 transition-all"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        Просмотр
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDownload(doc.id)}
                        className="h-8 hover:bg-tech-cyan/10 hover:text-tech-cyan hover:border-tech-cyan/50 transition-all"
                      >
                        <Download className="mr-1 h-3 w-3" />
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDownload(doc.id)}
                        className="h-8 hover:bg-tech-green/10 hover:text-tech-green hover:border-tech-green/50 transition-all"
                      >
                        <FileSpreadsheet className="mr-1 h-3 w-3" />
                        Excel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 border rounded-lg bg-muted/20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Предварительный просмотр документа</p>
              <p className="text-sm mt-2">В реальном приложении здесь будет PDF viewer</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
