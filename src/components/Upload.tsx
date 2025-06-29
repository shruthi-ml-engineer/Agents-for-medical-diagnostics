import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    fileList.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        alert(`File type ${file.type} is not supported. Please upload PDF, TXT, or DOC files.`);
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setFiles(prev => [...prev, newFile]);

      // Simulate upload process
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === newFile.id ? { ...f, status: 'success' } : f
        ));
      }, 2000);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const startAnalysis = () => {
    const successfulFiles = files.filter(f => f.status === 'success');
    if (successfulFiles.length === 0) {
      alert('Please upload at least one medical report before starting analysis.');
      return;
    }
    
    // Scroll to demo section to show analysis
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="upload" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Upload Medical Report
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Securely upload your medical reports to begin AI-powered diagnostic analysis
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-gradient rounded-2xl p-8"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragOver 
                ? 'border-white/50 bg-white/5' 
                : 'border-white/20 hover:border-white/30 hover:bg-white/2'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4 text-white">
              Drop your medical reports here
            </h3>
            <p className="text-gray-400 mb-6">
              or click to browse files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer inline-block hover-lift"
            >
              Browse Files
            </label>
            <p className="text-sm text-gray-500 mt-4">
              Supported formats: PDF, TXT, DOC, DOCX (Max 10MB each)
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-white">Uploaded Files</h4>
              <div className="space-y-3">
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {file.status === 'uploading' && (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      )}
                      {file.status === 'success' && (
                        <CheckCircle className="h-6 w-6 text-green-400" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="h-6 w-6 text-red-400" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {files.some(f => f.status === 'success') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <button
                    onClick={startAnalysis}
                    className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-lift"
                  >
                    Start AI Analysis
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Secure Upload</h4>
            <p className="text-sm text-gray-400">
              All files are encrypted and processed securely with HIPAA compliance
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <UploadIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Multiple Formats</h4>
            <p className="text-sm text-gray-400">
              Support for PDF, Word documents, and plain text medical reports
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-2">Instant Processing</h4>
            <p className="text-sm text-gray-400">
              AI agents begin analysis immediately after successful upload
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Upload;