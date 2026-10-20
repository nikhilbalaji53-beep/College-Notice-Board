import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  FileText,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { Notice, Attachment } from '../types';

interface PdfViewerModalProps {
  notice: Notice;
  attachment: Attachment;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  notice,
  attachment,
  onClose,
}) => {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  const handleDownload = () => {
    // Generate dummy text blob to simulate download
    const element = document.createElement('a');
    const file = new Blob([`OFFICIAL DOCUMENT: ${attachment.name}\nReference: ${notice.refNumber}\nIssuer: ${notice.issuerAuthority}\n\n${notice.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = attachment.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-hidden animate-fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden">
        
        {/* PDF Viewer Header Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 text-white shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md">{attachment.name}</h3>
              <p className="text-[11px] text-slate-400 font-mono">{notice.refNumber} • {attachment.size}</p>
            </div>
          </div>

          {/* Controls: Zoom, Page, Download */}
          <div className="flex items-center gap-2">
            
            {/* Page Nav */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg text-xs font-mono">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="hover:text-indigo-400 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{page} / {totalPages}</span>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="hover:text-indigo-400 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom controls */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-lg text-xs font-mono">
              <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="hover:text-indigo-400">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span>{zoom}%</span>
              <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="hover:text-indigo-400">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* PDF Canvas Simulation */}
        <div className="flex-1 bg-slate-950 p-4 sm:p-8 overflow-auto flex justify-center items-start">
          <div 
            className="w-full max-w-2xl bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 space-y-6 transition-all duration-200"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header Document Seal */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <Building2 className="w-10 h-10 text-indigo-900" />
                <div>
                  <h2 className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                    NATIONAL INSTITUTE OF TECHNOLOGY
                  </h2>
                  <p className="text-xs text-slate-600 font-semibold">{notice.department}</p>
                </div>
              </div>
              <div className="text-right font-mono text-xs">
                <p className="font-bold">{notice.refNumber}</p>
                <p className="text-slate-500">Page {page} of {totalPages}</p>
              </div>
            </div>

            {/* Page Content Simulation */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <h3 className="font-bold text-base text-slate-900">{notice.title}</h3>
              <p className="text-slate-700 font-serif">
                This document serves as an official attachment associated with notice circular <span className="font-semibold">{notice.refNumber}</span>, issued by authority of <span className="font-semibold">{notice.issuerAuthority}</span> ({notice.issuerDesignation}).
              </p>

              {page === 1 && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800 mb-2">Detailed Annexure Summary</h4>
                    <p className="text-xs text-slate-600 leading-normal">{notice.summary}</p>
                  </div>
                  <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                    <h4 className="font-bold text-xs uppercase tracking-wide text-indigo-900 mb-2">Target Distribution Criteria</h4>
                    <ul className="list-disc list-inside text-xs text-indigo-950 space-y-1">
                      <li>Eligible Academic Batches: {notice.targetYears.join(', ')}</li>
                      <li>Specified Engineering Wings: {notice.targetBranches.join(', ')}</li>
                      <li>Category Classification: {notice.category}</li>
                    </ul>
                  </div>
                </div>
              )}

              {page === 2 && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-xs uppercase text-slate-900">Regulation & Compliance Schedule</h4>
                  <table className="w-full text-xs border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-2 text-left">Phase / Metric</th>
                        <th className="border border-slate-300 p-2 text-left">Timeline</th>
                        <th className="border border-slate-300 p-2 text-left">Mandatory Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-300 p-2">Phase 1: Verification</td>
                        <td className="border border-slate-300 p-2">Immediate</td>
                        <td className="border border-slate-300 p-2 text-emerald-700 font-bold">Active</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-300 p-2">Phase 2: Execution</td>
                        <td className="border border-slate-300 p-2">Within 7 Days</td>
                        <td className="border border-slate-300 p-2 text-amber-700 font-bold">Pending</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {page === 3 && (
                <div className="space-y-4 pt-4">
                  <p className="text-xs text-slate-600">
                    For any disputes or administrative queries regarding this circular attachment, contact the Dean's Office via official campus mail.
                  </p>
                  <div className="pt-8 flex justify-end">
                    <div className="text-right border-t border-slate-400 pt-2">
                      <ShieldCheck className="w-5 h-5 text-indigo-600 ml-auto mb-1" />
                      <p className="font-bold text-xs text-slate-900">{notice.issuerAuthority}</p>
                      <p className="text-[10px] text-slate-500">{notice.issuerDesignation}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
